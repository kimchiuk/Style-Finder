package com.d111.backend.dto.feed.reponse;

import com.d111.backend.dto.feed.reponse.dto.FeedReadResponseDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedReadResponse {

    private String message;

    private FeedReadResponseDTO data;

    public static FeedReadResponse createFeedReadResponse(String message, FeedReadResponseDTO dto) {
        return FeedReadResponse.builder()
                .message(message)
                .data(dto)
                .build();
    }
}
