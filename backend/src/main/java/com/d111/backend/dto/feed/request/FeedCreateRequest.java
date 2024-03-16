package com.d111.backend.dto.feed.request;

import com.d111.backend.entity.coordi.Coordi;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedCreateRequest {

    private String feedTitle;

    private String feedContent;

    private String feedThumbnail;

    private Coordi coordi;


}
