package com.d111.backend.dto.feed.response;

import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static com.d111.backend.dto.coordi.response.dto.CoordiContainer.createMongoContainer;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedReadResponse {
    @Schema(description = "상태 메시지", example = "Success")
    private String message;
    @Schema(description = "데이터")
    private FeedInfo data;

    public static FeedReadResponse createFeedReadResponse(String message, Feed feed, MongoCoordiRepository mongoCoordiRepository) {
        CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);
        FeedInfo feedInfo = new FeedInfo(feed.getId(), feed.getUserId().getId(), feed.getFeedTitle(), feed.getFeedContent(), feed.getFeedThumbnail(), feed.getOriginWriter(), coordiContainer, feed.getFeedCreatedDate(), feed.getFeedLikes());

        return FeedReadResponse.builder()
                .message(message)
                .data(feedInfo)
                .build();
    }

    @Data
    @NoArgsConstructor
    public static class FeedInfo {


        @Schema(description = "피드 번호", example = "1")
        private Long feedId;

        @Schema(description = "피드 작성자")
        private Long userId;

        @Schema(description = "최초 등록자", example = "킹치욱")
        private Long originWriter;

        @Schema(description = "피드 제목", example = "멋있는 코디")
        private String feedTitle;

        @Schema(description = "피드 썸네일", example = "example.com")
        private String feedThumbnail;

        @Schema(description = "피드 내용", example = "내용입니다")
        private String feedContent;

        @Schema(description = "피드 생성일")
        private LocalDate feedCreatedDate;

        @Schema(description = "피드 좋아요")
        private Long feedLikes;

        private CoordiContainer coordiContainer;


        public FeedInfo(Long feedId, Long userId, String feedTitle, String feedContent, String feedThumbnail, Long originWriter, CoordiContainer coordiContainer, LocalDate feedCreatedDate, Long feedLikes) {
            this.feedId = feedId;
            this.userId = userId;
            this.feedTitle = feedTitle;
            this.feedContent = feedContent;
            this.feedThumbnail = feedThumbnail;
            this.originWriter = originWriter;
            this.coordiContainer = coordiContainer;
            this.feedCreatedDate = feedCreatedDate;
            this.feedLikes = feedLikes;
        }
    }
}