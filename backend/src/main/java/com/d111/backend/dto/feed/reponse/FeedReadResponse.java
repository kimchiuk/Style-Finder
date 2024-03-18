package com.d111.backend.dto.feed.reponse;

import com.d111.backend.dto.feed.reponse.dto.FeedReadResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FeedReadResponse {

    @Schema(description = "상태 메시지", example = "Success")
    private String message;

    @Schema(description = "데이터")
    private FeedReadResponseDTO data;

    public static FeedReadResponse createFeedReadResponse(String message, FeedReadResponseDTO dto) {
        return FeedReadResponse.builder()
                .message(message)
                .data(dto)
                .build();
    }
}
