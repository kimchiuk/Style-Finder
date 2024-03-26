package com.d111.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "AWS S3 URL 응답 정보")
@Getter
@Setter
@Builder
public class AWSS3ResDTO {
    private String url;
}