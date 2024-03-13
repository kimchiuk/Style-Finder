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

    private String head;

    private String upperBody;

    private String lowerBody;

    private String shoes;

}
