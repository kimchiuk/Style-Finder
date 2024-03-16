package com.d111.backend.controller.feed;

import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.service.feed.FeedService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Feed", description = "Feed API")
@RequestMapping("/api/feed")
@RestController
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<List<Coordi>> readCoordi() {
        return feedService.read();
    }
}

//    @GetMapping("/{id}")
//    public ResponseEntity<FeedReadResponse> feedRead(@PathVariable String id) {
//        return feedService.read(id);
//    }
