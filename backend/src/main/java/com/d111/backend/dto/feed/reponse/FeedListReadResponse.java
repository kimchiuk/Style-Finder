package com.d111.backend.dto.feed.reponse;

import com.d111.backend.entity.feed.Feed;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedListReadResponse {
    @Schema(description = "상태 메시지", example = "Success")
    private String message;
    @Schema(description = "데이터")
    private List<FeedInfo> data;

    public static FeedListReadResponse createFeedListReadResponse(String message, List<Feed> feedList) {
        List<FeedInfo> feedInfoList = feedList.stream()
                .map(feed -> new FeedInfo(feed.getFeedId(), feed.getFeedTitle(), feed.getFeedContent(), feed.getFeedThumbnail(), feed.getCoordiId()))
                .collect(Collectors.toList());

        return FeedListReadResponse.builder()
                .message(message)
                .data(feedInfoList)
                .build();
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FeedInfo {
        @Schema(description = "피드 번호", example = "1")
        private Long feedId;
        @Schema(description = "피드 제목", example = "멋있는 코디")
        private String feedTitle;
        @Schema(description = "피드 내용", example = "님들도 이렇게 입으세요")
        private String feedContent;
        @Schema(description = "피드 내용", example = "example.com")
        private String feedThumbnail;

        private String coordiId;

    }
}
