package com.d111.backend.dto.feed.request;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedCoordiCreateRequest {
    private FeedCreateRequest feedCreateRequest;
    private CoordiCreateRequest coordiCreateRequest;
}
