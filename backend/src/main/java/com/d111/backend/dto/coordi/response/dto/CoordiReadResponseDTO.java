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

    @Schema(description = "머리", example = "모자")
    private String head;

    @Schema(description = "상의", example = "티셔츠")
    private String upperBody;

    @Schema(description = "하의", example = "바지")
    private String lowerBody;

    @Schema(description = "신발", example = "운동화")
    private String shoes;

    public static CoordiReadResponseDTO createCoordiReadResponseDTO(Optional<Coordi> coordiOptional) {
            Coordi coordi = coordiOptional.get();
            return CoordiReadResponseDTO.builder()
                    ._id(coordi.get_id())
                    .userId(String.valueOf(coordi.getUser().getId()))
                    .head(coordi.getHead())
                    .upperBody(coordi.getUpperBody())
                    .lowerBody(coordi.getLowerBody())
                    .shoes(coordi.getShoes())
                    .build();
    }
}

