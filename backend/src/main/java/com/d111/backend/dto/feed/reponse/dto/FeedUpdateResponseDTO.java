package com.d111.backend.dto.feed.reponse.dto;

import com.d111.backend.entity.feed.Feed;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedUpdateResponseDTO {

    String feedTitle;

    String feedContent;

    public static FeedUpdateResponseDTO createFeedUpdateResponseDTO(Feed feed) {
        return FeedUpdateResponseDTO.builder()
                .feedTitle(feed.getFeedTitle())
                .feedContent(feed.getFeedContent())
                .build();
    }

}
