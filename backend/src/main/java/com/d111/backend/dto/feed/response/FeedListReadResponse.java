package com.d111.backend.dto.feed.response;

import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import static com.d111.backend.dto.coordi.response.dto.CoordiContainer.createMongoContainer;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedListReadResponse {
    @Schema(description = "상태 메시지", example = "Success")
    private String message;
    @Schema(description = "데이터")
    private List<FeedInfo> data;

    public static FeedListReadResponse createFeedListReadResponse(String message, List<Feed> feedList, MongoCoordiRepository mongoCoordiRepository) {

        List<FeedInfo> feedInfoList = feedList.stream()
                .map(feed -> {
                    CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);

                    return new FeedInfo(feed.getId(), feed.getUserId().getId(), feed.getFeedTitle(), feed.getFeedThumbnail(), feed.getFeedLikes(), coordiContainer);
                })
                .collect(Collectors.toList());

        return FeedListReadResponse.builder()
                .message(message)
                .data(feedInfoList)
                .build();
    }

    @Data
    @NoArgsConstructor
    public static class FeedInfo {
        @Schema(description = "피드 번호", example = "1")
        private Long feedId;
        @Schema(description = "유저 번호", example = "1")
        private Long userId;
        @Schema(description = "피드 제목", example = "멋있는 코디")
        private String feedTitle;
        @Schema(description = "피드 내용", example = "example.com")
        private String feedThumbnail;
        @Schema(description = "피드 좋아요")
        private Long feedLikes;


        private CoordiContainer coordiContainer;

        public FeedInfo(Long feedId, Long userId, String feedTitle, String feedThumbnail, Long feedLikes,CoordiContainer coordiContainer) {
            this.feedId = feedId;
            this.userId = userId;
            this.feedTitle = feedTitle;
            this.feedThumbnail = feedThumbnail;
            this.feedLikes = feedLikes;
            this.coordiContainer = coordiContainer;
        }
    }
}
