package com.d111.backend.dto.coordi.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoordiCreateRequest {


    private ClothInfo outerCloth;

    private ClothInfo upperBody;

    private ClothInfo lowerBody;

    private ClothInfo dress;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClothInfo {
        private String style;
        private String category;
        private String color;
        private String imageUrl;
    }

}
