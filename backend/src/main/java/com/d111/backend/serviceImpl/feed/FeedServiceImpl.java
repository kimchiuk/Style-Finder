package com.d111.backend.serviceImpl.feed;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.feed.reponse.FeedCreateResponse;
import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.reponse.dto.FeedReadResponseDTO;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.feed.FeedNotFoundException;
import com.d111.backend.repository.feed.FeedRepository;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.feed.FeedService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final MongoCoordiRepository mongoCoordiRepository;

// 피드 개별 생성
//    @Override
//    public ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest) {
//
//        String userid = JWTUtil.findEmailByToken();
//        Optional<User> currentUser = userRepository.findByEmail(userid);
//        LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
//
//        Feed feed = Feed.builder()
//                .feedTitle(feedCreateRequest.getFeedTitle())
//                .feedContent(feedCreateRequest.getFeedContent())
//                .feedThumbnail(feedCreateRequest.getFeedThumbnail())
//                .feedCreatedDate(now)
//                .feedUpdatedDate(now)
//                .userId(currentUser.get())
//                .build();
//
//
//        feedRepository.save(feed);
//
//        FeedCreateResponse response = FeedCreateResponse.createFeedCreateResponse(
//                "success",
//                true
//        );
//        return ResponseEntity.ok(response);
//    }
//

    // 피드 및 코디 생성
    @Override
    public ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest, CoordiCreateRequest coordiCreateRequest) {
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
                feedList
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 피드 개별 조회
    @Override
    public ResponseEntity<FeedReadResponse> read(String coordiId) {

        Coordi coordi = mongoCoordiRepository.findById(coordiId).orElseThrow(() -> new FeedNotFoundException("feed not found"));

        FeedReadResponse response = FeedReadResponse.createFeedReadResponse(
                "success",
                FeedReadResponseDTO.createFeedReadResponseDTO(coordi));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public ResponseEntity<FeedDeleteResponse> delete(String coordiId){

        Coordi coordi = mongoCoordiRepository.findById(coordiId).orElseThrow(() -> new FeedNotFoundException("feed not found"));
        mongoCoordiRepository.delete(coordi);

        Optional<Feed> optionalFeed = feedRepository.findByCoordiId(coordiId);
        Feed feed = optionalFeed.get();
        feedRepository.delete(feed);


        FeedDeleteResponse response = FeedDeleteResponse.createFeedDeleteResponse(
                "success",
                true
        );

        return ResponseEntity.ok(response);
    }
}
