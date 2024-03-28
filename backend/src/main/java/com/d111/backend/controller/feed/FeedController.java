package com.d111.backend.controller.feed;

import com.d111.backend.dto.feed.request.FeedCoordiCreateRequest;
import com.d111.backend.dto.feed.request.FeedUpdateRequest;
import com.d111.backend.dto.feed.request.FittingRequest;
import com.d111.backend.dto.feed.response.FeedDeleteResponse;
import com.d111.backend.dto.feed.response.FeedListReadResponse;
import com.d111.backend.dto.feed.response.FeedReadResponse;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.user.EmailNotFoundException;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.feed.FeedService;
import com.d111.backend.util.JWTUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Tag(name = "Feed", description = "Feed API")
@RequestMapping("/api/feed")
@RestController
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;
    private final UserRepository userRepository;

    // 피드 전체 조회
    @GetMapping
    public ResponseEntity<FeedListReadResponse> readFeedList() {
        return feedService.readList();
    }

    // 피드 및 코디 생성
    @PostMapping(value = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createFeedCoordi(@RequestPart(value = "feedcoordiCreateRequest") FeedCoordiCreateRequest request,
                                                               @RequestPart(value = "feedThumbnail", required = false) MultipartFile feedThumbnail) {
        return feedService.create(request.getFeedCreateRequest(), request.getCoordiCreateRequest(), feedThumbnail);
    }

    // 피드 상세 조회
    @GetMapping("/{feedId}")
    public ResponseEntity<FeedReadResponse> readFeed(@PathVariable Long feedId){
        return feedService.read(feedId);
    }

    // 피드 삭제
    @DeleteMapping("/{feedId}")
    public ResponseEntity<FeedDeleteResponse> deleteFeed(@PathVariable Long feedId){
        return feedService.delete(feedId);
    }

    // 피드 좋아요
    @PostMapping("/like/{feedId}")
    public ResponseEntity<?> feedLikes(@PathVariable Long feedId) {
        return feedService.feedLikes(feedId);
    }

    // 피드 수정
    @PutMapping(value = "/update/{feedId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateFeed(@PathVariable Long feedId,
                                        @RequestPart(value = "feedUpdateRequest") FeedUpdateRequest feedUpdateRequest,
                                        @RequestPart(value = "feedThumbnail", required = false) MultipartFile multipartFile) {
        return feedService.update(feedId, feedUpdateRequest, multipartFile);
    }

    // 피드 인기순 조회
    @GetMapping("/popularity")
    public ResponseEntity<FeedListReadResponse> readPopularFeedList() {
        return feedService.readPopularList();
    }


    // 피드 서치
    @GetMapping("/search")
    public ResponseEntity<Page<Feed>> searchByTitle(@RequestParam(value = "title") String title, Pageable pageable) {
        Page<Feed> searchResult = feedService.searchByTitle(title, pageable);
        return ResponseEntity.ok(searchResult);
    }

    
    // 내가 쓴 피드 조회
    @GetMapping("/myfeed")
    public ResponseEntity<FeedListReadResponse> searchMyFeed() {
        Optional<User> currentUserId = getCurrentUserId();
        ResponseEntity<FeedListReadResponse> responseEntity = feedService.searchMyFeed(currentUserId);

        return responseEntity;
    }


//
//      // 피드 서치 페이지설정
//        @GetMapping("/search")
//        public ResponseEntity<Page<Feed>> searchByTitle(@RequestParam(value = "title") String title,
//                                                        @RequestParam(value = "page", defaultValue = "0") int page,
//                                                        @RequestParam(value = "size", defaultValue = "10") int size) {
//            Pageable pageable = PageRequest.of(page, size);
//            Page<Feed> searchResult = feedService.searchByTitle(title, pageable);
//            return ResponseEntity.ok(searchResult);
//        }

    // 피팅해보기
    @PostMapping(value = "/{feedId}/fitting")
    public ResponseEntity<?> fitting(@RequestBody FittingRequest fittingRequest, @PathVariable Long feedId){
        return feedService.fitting(fittingRequest, feedId);
    }


    private Optional<User> getCurrentUserId() {
        // 현재 로그인한 유저 정보 받아오기
        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);

        if (currentUser.isEmpty()) {
            throw new EmailNotFoundException("사용자를 찾을 수 없습니다.");
        }
        return currentUser;
    }
}
