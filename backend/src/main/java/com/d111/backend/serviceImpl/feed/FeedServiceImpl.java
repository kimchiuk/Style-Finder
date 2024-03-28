package com.d111.backend.serviceImpl.feed;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.dto.feed.request.FeedUpdateRequest;
import com.d111.backend.dto.feed.request.FittingRequest;
import com.d111.backend.dto.feed.response.*;
import com.d111.backend.dto.feed.response.dto.FeedListReadResponseDTO;
import com.d111.backend.dto.feed.response.dto.FeedUpdateResponseDTO;
import com.d111.backend.entity.comment.Comment;
import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.likes.Likes;
import com.d111.backend.entity.multipart.S3File;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.feed.CoordiNotFoundException;
import com.d111.backend.exception.feed.FeedImageIOException;
import com.d111.backend.exception.feed.FeedNotFoundException;
import com.d111.backend.exception.user.EmailNotFoundException;
import com.d111.backend.exception.user.UnauthorizedAccessException;
import com.d111.backend.repository.Likes.LikesRepository;
import com.d111.backend.repository.comment.CommentRepository;
import com.d111.backend.repository.feed.FeedRepository;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.repository.s3.S3Repository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.feed.FeedService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import static com.d111.backend.dto.coordi.response.dto.CoordiContainer.createMongoContainer;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final MongoCoordiRepository mongoCoordiRepository;
    private final S3Repository s3Repository;
    private final AmazonS3Client amazonS3Client;
    private final LikesRepository likesRepository;
    private final CommentRepository commentRepository;

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
        Long userId = currentUser.get().getId();

        LocalDate now = LocalDate.now(ZoneId.of("UTC"));

        Feed feed = Feed.createFeed(feedCreateRequest, coordiId);

        if(feed.getOriginWriter() == null){
            feed.setOriginWriter(userId);
        }

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

        if (feedList.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }

        List<FeedListReadResponseDTO> feedListReadResponseDTOList = new ArrayList<>();

        // 각 피드의 이미지를 가져와서 리스트에 추가
        for (Feed feed : feedList) {
            // 피드 썸네일 읽어오기
            String storeFilePath = feed.getFeedThumbnail();
            byte[] feedThumbnail = getFeedThumbnailFromS3(bucket, storeFilePath);

            CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);

            feedListReadResponseDTOList.add(
                    FeedListReadResponseDTO.builder()
                            .user(feed.getUserId())
                            .feedId(feed.getId())
                            .feedTitle(feed.getFeedTitle())
                            .feedThumbnail(feedThumbnail)
                            .feedLikes(feed.getFeedLikes())
                            .coordiContainer(coordiContainer)
                            .build()
            );
        }

        // 응답 생성
        FeedListReadResponse response = FeedListReadResponse.builder()
                .message("Success")
                .data(feedListReadResponseDTOList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 피드 상세 조회
    @Override
    public ResponseEntity<FeedReadResponse> read(Long feedId) {
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        Feed feed = optionalFeed.orElseThrow(() -> new FeedNotFoundException("피드를 찾을 수 없습니다."));
        Coordi coordi = mongoCoordiRepository.findById(feed.getCoordiId())
                .orElseThrow(() -> new CoordiNotFoundException("코디를 찾을 수 없습니다."));

        // 피드 썸네일 읽어오기
        String storeFilePath = feed.getFeedThumbnail();
        byte[] feedThumbnail = getFeedThumbnailFromS3(bucket, storeFilePath);
        feed.setFeedThumbnail(Arrays.toString(feedThumbnail));

        List<Comment> comments = commentRepository.findAllByFeedId(feed);

        FeedReadResponse response = FeedReadResponse.createFeedReadResponse(
                "success", feed, mongoCoordiRepository, comments);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // feedId로 개별 조회 후 삭제
    public ResponseEntity<FeedDeleteResponse> delete(Long feedId) {

        // 현재 로그인한 유저 정보 받아오기
        String userid = JWTUtil.findEmailByToken();
        User user = userRepository.findByEmail(userid)
                .orElseThrow(() -> new EmailNotFoundException("사용자를 찾을 수 없습니다."));

        Long userId = user.getId();
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);

        if (optionalFeed.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }
        Feed feed = optionalFeed.get();

        if (!userId.equals(feed.getUserId().getId())) {
            throw new UnauthorizedAccessException("피드를 삭제할 권한이 없습니다.");
        }

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

    // 피드 좋아요
    @Override
    public ResponseEntity<?> feedLikes(Long feedId) {
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);

        if (optionalFeed.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }

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
            feed.setFeedLikes(feed.getFeedLikes() - 1);
            feedRepository.save(feed);


            return ResponseEntity.ok("좋아요 취소를 눌렀습니다.");

        } else {
            // 좋아요를 누르지 않았다면 좋아요
            Likes like = Likes.createLikes(feed, currentUser.get());
            likesRepository.save(like);
            feed.setFeedLikes(feed.getFeedLikes() + 1);
            feedRepository.save(feed);
        }

        return ResponseEntity.ok("피드 좋아요를 눌렀습니다.");
    }


    @Override
    public ResponseEntity<FeedUpdateResponse> update(Long feedId, FeedUpdateRequest feedUpdateRequest, MultipartFile multipartFile) {

        // 현재 로그인한 유저 정보 받아오기
        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);

        if (currentUser.isEmpty()) {
            throw new EmailNotFoundException("사용자를 찾을 수 없습니다.");
        }

        Long userId = currentUser.get().getId();

        Optional<Feed> optionalFeed = feedRepository.findById(feedId);

        if (optionalFeed.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }
        Feed feed = optionalFeed.get();
        Long feedUserId = feed.getUserId().getId();

        if (!userId.equals(feedUserId)) {
            throw new UnauthorizedAccessException("피드를 수정할 수 없습니다.");
        }

        // 제목에 대한 입력값이 없을 경우
        if (feedUpdateRequest.getFeedTitle().isBlank()) {
            throw new RuntimeException("제목을 입력해주세요.");
        }

        LocalDate now = LocalDate.now(ZoneId.of("UTC"));

        // 피드 제목 및 내용 업데이트
        feed.updateFeedTitle(feedUpdateRequest.getFeedTitle());
        feed.updateFeedContent(feedUpdateRequest.getFeedContent());
        feed.updateFeedUpdatedDate(now);

        feedRepository.save(feed);

        FeedUpdateResponse response = FeedUpdateResponse.createFeedUpdateResponse(
                "success",
                FeedUpdateResponseDTO.createFeedUpdateResponseDTO(feed));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<FeedListReadResponse> readPopularList() {
        List<Feed> feedList = feedRepository.findAllByOrderByFeedLikesDesc();

        if (feedList.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }

        List<FeedListReadResponseDTO> feedListReadResponseDTOList = new ArrayList<>();

        // 각 피드의 이미지를 가져와서 리스트에 추가
        for (Feed feed : feedList) {
            // 피드 썸네일 읽어오기
            String storeFilePath = feed.getFeedThumbnail();
            byte[] feedThumbnail = getFeedThumbnailFromS3(bucket, storeFilePath);

            CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);

            feedListReadResponseDTOList.add(
                    FeedListReadResponseDTO.builder()
                            .user(feed.getUserId())
                            .feedId(feed.getId())
                            .feedTitle(feed.getFeedTitle())
                            .feedThumbnail(feedThumbnail)
                            .feedLikes(feed.getFeedLikes())
                            .coordiContainer(coordiContainer)
                            .build()
            );
        }

        // 응답 생성
        FeedListReadResponse response = FeedListReadResponse.builder()
                .message("Success")
                .data(feedListReadResponseDTOList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public Page<Feed> searchByTitle(String title, Pageable pageable) {
        // 검색어가 없으면 빈 문자열로 설정, trim으로 검색어 공백 제거
        title = (title == null) ? "" : title.trim();
        // 검색어가 없는 경우 모든 피드 반환
        if (title.isEmpty()) {
            return feedRepository.findAll(pageable);
        } else {
            // 제목에 검색어를 포함하는 피드를 반환
            return feedRepository.findByfeedTitleContaining(title, pageable);
        }
    }

    // 내가 쓴 피드 조회
    @Override
    public ResponseEntity<FeedListReadResponse> searchMyFeed(Optional<User> userId) {

        List<Feed> MyFeedList = feedRepository.findAllByuserId(userId);

        if (MyFeedList.isEmpty()) {
            throw new FeedNotFoundException("피드를 찾을 수 없습니다.");
        }

        List<FeedListReadResponseDTO> feedListReadResponseDTOList = new ArrayList<>();

        // 각 피드의 이미지를 가져와서 리스트에 추가
        for (Feed feed : MyFeedList) {
            // 피드 썸네일 읽어오기
            String storeFilePath = feed.getFeedThumbnail();
            byte[] feedThumbnail = getFeedThumbnailFromS3(bucket, storeFilePath);

            CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);

            feedListReadResponseDTOList.add(
                    FeedListReadResponseDTO.builder()
                            .feedId(feed.getId())
                            .feedTitle(feed.getFeedTitle())
                            .feedThumbnail(feedThumbnail)
                            .feedLikes(feed.getFeedLikes())
                            .coordiContainer(coordiContainer)
                            .build()
            );
        }

        // 응답 생성
        FeedListReadResponse response = FeedListReadResponse.builder()
                .message("Success")
                .data(feedListReadResponseDTOList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<?> fitting(FittingRequest fittingRequest, Long feedId) {

        String newFeedTitle = fittingRequest.getNewFeedTitle();
        String newFeedContent = fittingRequest.getNewFeedContent();

        // 기존 피드 정보 가져오기
        Feed originFeed = feedRepository.findById(feedId)
                .orElseThrow(() -> new FeedNotFoundException("피드를 찾을 수 없습니다."));

        // 현재 로그인한 유저 정보 받아오기
        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);

        if (currentUser.isEmpty()) {
            throw new EmailNotFoundException("사용자를 찾을 수 없습니다.");
        }

        // 새로운 피드 생성
        Feed newFeed = Feed.builder()
                .userId(currentUser.get())
                .feedTitle(newFeedTitle)
                .feedContent(newFeedContent)
                .coordiId(originFeed.getCoordiId())
                .originWriter(originFeed.getOriginWriter())
                .feedThumbnail(originFeed.getFeedThumbnail())
                .feedCreatedDate(LocalDate.now(ZoneId.of("UTC")))
                .feedUpdatedDate(LocalDate.now(ZoneId.of("UTC")))
                .build();

        feedRepository.save(newFeed);

        return ResponseEntity.ok("피드가 생성되었습니다.");
    }

    public byte[] getFeedThumbnailFromS3(String bucket, String storeFilePath) throws FeedImageIOException {
        try {
            GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, storeFilePath);
            S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
            S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();
            return IOUtils.toByteArray(s3ObjectInputStream);
        } catch (IOException exception) {
            throw new FeedImageIOException("피드 썸네일을 불러오지 못했습니다.");
        } catch (AmazonS3Exception exception) {
            throw new FeedImageIOException("저장된 피드 썸네일이 없습니다.");
        }
    }
}