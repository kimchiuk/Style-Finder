package com.d111.backend.service.recommend;

import com.d111.backend.dto.recommend.response.ItemRecommendResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RecommendService {

    ResponseEntity<List<ItemRecommendResponseDTO>> recommendItems();
}
