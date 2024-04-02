package com.d111.backend.dto.recommend.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemRecommendResponseDTO {

    private OuterClothResponseDTO outerCloth;

    private UpperBodyResponseDTO upperBody;

    private LowerBodyResponseDTO lowerBody;

    private DressResponseDTO dress;

}
