package com.d111.backend.controller.recommend;

import com.d111.backend.dto.recommend.response.ItemRecommendResponseDTO;
import com.d111.backend.service.recommend.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/recommend")
@RestController
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping("/outer/{itemCategory}")
    public ResponseEntity<List<ItemRecommendResponseDTO>> recommend(@RequestParam String itemCategory) {
        return recommendService.recommendItems(itemCategory);
    }

}
