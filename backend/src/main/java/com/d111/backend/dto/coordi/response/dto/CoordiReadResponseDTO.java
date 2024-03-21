package com.d111.backend.dto.coordi.response.dto;

import com.d111.backend.entity.coordi.Coordi;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.Optional;

@Data
@Builder
public class CoordiReadResponseDTO {

    @Schema(description = "유저 번호", example = "1")
    private String userId;

    @Schema(description = "코디 번호", example = "1")
    private String _id;

    @Schema(description = "아우터", example = "패딩")
    private String outerCloth;

    @Schema(description = "상의", example = "티셔츠")
    private String upperBody;

    @Schema(description = "하의", example = "바지")
    private String lowerBody;

    @Schema(description = "원피스", example = "원피스")
    private String onepiece;

    public static CoordiReadResponseDTO createCoordiReadResponseDTO(Optional<Coordi> coordiOptional) {
            Coordi coordi = coordiOptional.get();
            return CoordiReadResponseDTO.builder()
                    ._id(coordi.get_id())
                    .outerCloth(coordi.getOuterCloth())
                    .upperBody(coordi.getUpperBody())
                    .lowerBody(coordi.getLowerBody())
                    .onepiece(coordi.getOnepiece())
                    .build();
    }
}

