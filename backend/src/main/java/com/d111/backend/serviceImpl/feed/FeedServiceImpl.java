package com.d111.backend.serviceImpl.feed;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.feed.reponse.FeedCreateResponse;
import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.reponse.dto.FeedReadResponseDTO;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.likes.Likes;
import com.d111.backend.entity.multipart.S3File;
import com.d111.backend.entity.user.User;
import com.d111.backend.repository.Likes.LikesRepository;
import com.d111.backend.repository.feed.FeedRepository;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.repository.s3.S3Repository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.feed.FeedService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final MongoCoordiRepository mongoCoordiRepository;
    private final S3Repository s3Repository;
    private final AmazonS3Client amazonS3Client;
    private final LikesRepository likesRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름


    // 피드 및 코디 생성
    @Override
    @Transactional
    public ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest,
                                                     CoordiCreateRequest coordiCreateRequest,
                                                     MultipartFile feedThumbnail) {

        // S3 bucket에 프로필 이미지 저장
        String storeFilePath;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentEncoding(feedThumbnail.getContentType());
        objectMetadata.setContentLength(feedThumbnail.getSize());

        String originalFileFullName = feedThumbnail.getOriginalFilename();
        String originalFileName = originalFileFullName.substring(originalFileFullName.lastIndexOf(".") + 1);

        String storeFileName = UUID.randomUUID() + "." + originalFileName;
        storeFilePath = "FeedThumbnail/" + storeFileName;

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, storeFilePath, feedThumbnail.getInputStream(), objectMetadata
            );

            amazonS3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new RuntimeException("피드 썸네일 저장에 실패하였습니다.");
        }

        S3File s3File = new S3File(originalFileFullName, storeFileName, storeFilePath);
        s3Repository.upload(s3File);


        // Coordi 생성
        Coordi coordi = Coordi.createCoordi(coordiCreateRequest);
        Coordi savedCoordi = mongoCoordiRepository.save(coordi);
        String coordiId = savedCoordi.get_id(); // mongoDB에서 _id 값 가져옴

        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);
        LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));

        Feed feed = Feed.createFeed(feedCreateRequest, coordiId);
        feed.setFeedCreatedDate(now);
        feed.setFeedUpdatedDate(now);
        feed.setUserId(currentUser.get());
        feed.setFeedThumbnail(storeFilePath);

        feedRepository.save(feed);

        FeedCreateResponse response = FeedCreateResponse.createFeedCreateResponse(
                "success",
                true
        );
        return ResponseEntity.ok(response);
    }

    // 피드 전체 조회
    @Override
    public ResponseEntity<FeedListReadResponse> readList() {
        List<Feed> feedList = feedRepository.findAll();
        FeedListReadResponse response = FeedListReadResponse.createFeedListReadResponse(
                "Success",
                feedList,
                mongoCoordiRepository
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // feedId로 피드 상세 조회
    @Override
    public ResponseEntity<FeedReadResponse> read(Long feedId) {


        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        Feed feed = optionalFeed.get();

        String coordiId = feed.getCoordiId();
        Coordi coordi = mongoCoordiRepository.findById(coordiId).orElseThrow(() -> new RuntimeException("coordi not found"));

        FeedReadResponse response = FeedReadResponse.createFeedReadResponse(
                "success",
                FeedReadResponseDTO.createFeedReadResponseDTO(coordi));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // feedId로 개별 조회 후 삭제
    public ResponseEntity<FeedDeleteResponse> delete(Long feedId){

        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        Feed feed = optionalFeed.get();

        String coordiId = feed.getCoordiId();
        Coordi coordi = mongoCoordiRepository.findById(coordiId).orElseThrow(() -> new RuntimeException("coordi not found"));
        mongoCoordiRepository.delete(coordi);

        feedRepository.delete(feed);

        FeedDeleteResponse response = FeedDeleteResponse.createFeedDeleteResponse(
                "success",
                true
        );

        return ResponseEntity.ok(response);
    }


    @Override
    public ResponseEntity<?> feedLikes(Long feedId) {

        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);
        Long userId = currentUser.get().getId();

        Optional<Feed> feedOptional = feedRepository.findById(feedId);

        if (feedOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Feed feed = feedOptional.get();

        // 해당 사용자가 해당 피드에 이미 좋아요를 눌렀는지 확인
        Optional<Likes> existingLike = likesRepository.findByFeedIdAndUserId(feedId, userId);

        if (existingLike.isPresent()) {
            // 이미 좋아요를 누른 상태라면 좋아요 취소
            likesRepository.delete(existingLike.get());
            feed.setFeedlikes(feed.getFeedlikes() - 1);

            return ResponseEntity.ok("좋아요 취소를 눌렀습니다.");

        } else {
            // 좋아요를 누르지 않았다면 좋아요
            Likes like = Likes.createLikes(feed, currentUser.get());
            likesRepository.save(like);
            feed.setFeedlikes(feed.getFeedlikes() + 1);
        }
        feedRepository.save(feed);

        return ResponseEntity.ok("피드 좋아요를 눌렀습니다.");
    }
}
