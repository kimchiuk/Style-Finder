package com.d111.backend.dto.feed.response.dto;

import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.entity.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedListReadResponseDTO {
    
    @Schema(description = "피드 번호", example = "1")
    private Long feedId;

    @Schema(description = "유저 정보", example = "1")
    private FeedListUserDTO user;

    @Schema(description = "피드 제목", example = "멋있는 코디")
    private String feedTitle;

    @Schema(description = "피드 내용", example = "example.com")
    private byte[] feedThumbnail;

    @Schema(description = "피드 좋아요")
    private Long feedLikes;

    private CoordiContainer coordiContainer;
}
