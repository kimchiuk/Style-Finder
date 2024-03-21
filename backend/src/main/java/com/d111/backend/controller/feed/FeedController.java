package com.d111.backend.controller.feed;

import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.request.FeedCoordiCreateRequest;
import com.d111.backend.dto.feed.request.FeedUpdateRequest;
import com.d111.backend.service.feed.FeedService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Feed", description = "Feed API")
@RequestMapping("/api/feed")
@RestController
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

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
}
