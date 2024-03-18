package com.d111.backend.entity.feed;

import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Feed")
public class Feed {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private Long feedId;

    @Column(nullable = false, length = 50, name = "feed_title")
    private String feedTitle;

    @Column(nullable = false, name = "feed_content")
    private String feedContent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User userId;

    @Column(nullable = false, name = "feed_thumbnail")
    private String feedThumbnail;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, name = "feed_created_date")
    private LocalDateTime feedCreatedDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, name = "feed_updated_date")
    private LocalDateTime feedUpdatedDate;

    @Column(nullable = false, name = "coordi_id")
    private String coordiId;

    public static Feed createFeed(FeedCreateRequest feedCreateRequest, String coordiId) {
        return Feed.builder()
                .feedTitle(feedCreateRequest.getFeedTitle())
                .feedContent(feedCreateRequest.getFeedContent())
                .feedThumbnail(feedCreateRequest.getFeedThumbnail())
                .coordiId(coordiId)
                .build();
    }
}
