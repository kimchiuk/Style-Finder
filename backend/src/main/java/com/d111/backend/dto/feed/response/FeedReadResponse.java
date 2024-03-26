package com.d111.backend.dto.feed.response;

import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.entity.comment.Comment;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.user.User;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public static FeedReadResponse createFeedReadResponse(String message, Feed feed, MongoCoordiRepository mongoCoordiRepository, List<Comment> comments) {
        CoordiContainer coordiContainer = createMongoContainer(feed.getCoordiId(), mongoCoordiRepository);

        List<CommentInfo> commentInfos = new ArrayList<>();

        for (Comment comment: comments) {
            User user = comment.getUserId();

            Commenter commenter = Commenter.builder()
                    .nickname(user.getNickname())
                    .profileImage(user.getProfileImage())
                    .build();

            CommentInfo commentInfo = CommentInfo.builder()
                    .commenter(commenter)
                    .content(comment.getContent())
                    .commentCreatedDate(comment.getCreatedDate())
                    .commentUpdatedDate(comment.getUpdatedDate())
                    .build();

            commentInfos.add(commentInfo);
        }


        FeedInfo feedInfo = FeedInfo.builder()
                .feedId(feed.getId())
                .user(feed.getUserId())
                .feedTitle(feed.getFeedTitle())
                .feedContent(feed.getFeedContent())
                .feedThumbnail(feed.getFeedThumbnail().getBytes())
                .originWriter(feed.getOriginWriter())
                .coordiContainer(coordiContainer)
                .feedCreatedDate(feed.getFeedCreatedDate())
                .feedUpdatedDate(feed.getFeedUpdatedDate())
                .comments(commentInfos)
                .build();

        return FeedReadResponse.builder()
                .message(message)
                .data(feedInfo)
                .build();
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FeedInfo {

        @Schema(description = "피드 번호", example = "1")
        private Long feedId;

        @Schema(description = "피드 작성자")
        private User user;

        @Schema(description = "최초 등록자", example = "킹치욱")
        private Long originWriter;

        @Schema(description = "피드 제목", example = "멋있는 코디")
        private String feedTitle;

        @Schema(description = "피드 썸네일", example = "example.com")
        private byte[] feedThumbnail;

        @Schema(description = "피드 내용", example = "내용입니다")
        private String feedContent;

        @Schema(description = "피드 생성일")
        private LocalDate feedCreatedDate;

        @Schema(description = "피드 수정일")
        private LocalDate feedUpdatedDate;

        @Schema(description = "피드 좋아요")
        private Long feedLikes;

        private CoordiContainer coordiContainer;

        @Schema(description = "댓글 목록")
        private List<CommentInfo> comments;



        public FeedInfo(Long feedId, User user, String feedTitle, String feedContent, byte[] feedThumbnail, Long originWriter, CoordiContainer coordiContainer, LocalDate feedCreatedDate, Long feedLikes, LocalDate feedUpdatedDate, List<CommentInfo> comments) {
            this.feedId = feedId;
            this.user = user;
            this.feedTitle = feedTitle;
            this.feedContent = feedContent;
            this.feedThumbnail = feedThumbnail;
            this.originWriter = originWriter;
            this.coordiContainer = coordiContainer;
            this.feedCreatedDate = feedCreatedDate;
            this.feedUpdatedDate = feedUpdatedDate;
            this.comments = comments;
            this.feedLikes = feedLikes;
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class CommentInfo {
        @Schema(description = "댓글 작성자 정보")
        private Commenter commenter;

        @Schema(description = "댓글 내용")
        private String content;

        @Schema(description = "작성일")
        private LocalDate commentCreatedDate;

        @Schema(description = "수정일")
        private LocalDate commentUpdatedDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Commenter {

        @Schema(description = "댓글 작성자 닉네임")
        private String nickname;

        @Schema(description = "댓글 작성자 프로필 이미지")
        private String profileImage;
    
    }

}