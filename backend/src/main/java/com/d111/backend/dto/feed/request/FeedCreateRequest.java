package com.d111.backend.dto.feed.request;

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

    private String coordiId; // Coordi의 _id 추가


}
