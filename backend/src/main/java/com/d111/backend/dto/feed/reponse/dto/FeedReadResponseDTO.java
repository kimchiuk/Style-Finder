package com.d111.backend.dto.feed.reponse.dto;

import com.d111.backend.entity.coordi.Coordi;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedReadResponseDTO {

    @Schema(description = "피드 Id", example = "12f5de12346a2e111aace123")
    private String id;

    @Schema(description = "아우터", example = "패딩")
    private String outerCloth;

    @Schema(description = "상의", example = "티셔츠")
    private String upperBody;

    @Schema(description = "하의", example = "바지")
    private String lowerBody;

    @Schema(description = "원피스", example = "원피스")
    private String dress;


    public static FeedReadResponseDTO createFeedReadResponseDTO(Coordi coordi) {
        return FeedReadResponseDTO.builder()
                .id(coordi.get_id())
                .outerCloth(coordi.getOuterCloth())
                .upperBody(coordi.getUpperBody())
                .lowerBody(coordi.getLowerBody())
                .dress(coordi.getDress())
                .build();
    }


}
