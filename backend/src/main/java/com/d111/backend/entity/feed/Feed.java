package com.d111.backend.entity.feed;

import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.entity.comment.Comment;
import com.d111.backend.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Feed")
public class Feed {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private Long id;

    @Column(nullable = false, length = 50, name = "feed_title")
    private String feedTitle;

    @Column(nullable = false, name = "feed_content")
    private String feedContent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User userId;

    @Column(nullable = false, name = "feed_thumbnail")
    private String feedThumbnail = "";

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, name = "feed_created_date")
    private LocalDate feedCreatedDate;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, name = "feed_updated_date")
    private LocalDate feedUpdatedDate;

    @Column(nullable = false, name = "coordi_id")
    private String coordiId;

    @Builder.Default
    @Column(name = "feed_likes")
    private Long feedLikes = 0L;

    @Column(name = "origin_writer")
    private Long originWriter;

    @Builder.Default
    @OneToMany(mappedBy = "feedId", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    public void updateFeedTitle(String feedTitle) {
        this.feedTitle = feedTitle;
    }

    public void updateFeedContent(String feedContent) {
        this.feedContent = feedContent;
    }

    public void updateFeedUpdatedDate(LocalDate feedUpdatedDate) {
        this.feedUpdatedDate = feedUpdatedDate;
    }


    public static Feed createFeed(FeedCreateRequest feedCreateRequest, String coordiId) {
        return Feed.builder()
                .feedTitle(feedCreateRequest.getFeedTitle())
                .feedContent(feedCreateRequest.getFeedContent())
                .coordiId(coordiId)
                .build();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void deleteComment(Comment comment) {
        comments.remove(comment);
    }

}
