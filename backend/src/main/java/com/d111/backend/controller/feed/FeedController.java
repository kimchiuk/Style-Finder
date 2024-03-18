package com.d111.backend.controller.feed;

import com.d111.backend.dto.feed.reponse.FeedCreateResponse;
import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.request.FeedCoordiCreateRequest;
import com.d111.backend.service.feed.FeedService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/create")
    public ResponseEntity<FeedCreateResponse> createFeedCoordi(@RequestBody FeedCoordiCreateRequest request) {
        return feedService.create(request.getFeedCreateRequest(), request.getCoordiCreateRequest());
    }


    // 피드 개별 조회
//    @GetMapping("/{feedId}")
//    public ResponseEntity<FeedReadResponse> readFeed(@PathVariable Long feedId){
//        return feedService.read(feedId);
//    }

    @GetMapping("/{coordiId}")
    public ResponseEntity<FeedReadResponse> readFeed(@PathVariable String coordiId){
        return feedService.read(coordiId);
    }


    @PostMapping("/{coordiId}")
    public ResponseEntity<FeedDeleteResponse> deleteFeed(@PathVariable String coordiId){
        return feedService.delete(coordiId);
    }

}
