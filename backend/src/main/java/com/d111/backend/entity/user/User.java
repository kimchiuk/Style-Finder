package com.d111.backend.entity.user;

import com.d111.backend.entity.comment.Comment;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Long id;

    @Column(name = "user_email", length = 50, nullable = false, unique = true)
    String email;

    @Column(name = "user_password", nullable = false)
    String password;

    @Column(name = "user_nickname", length = 50, nullable = false)
    String nickname;

    @Builder.Default
    @Column(name = "user_profile_image")
    String profileImage = "";

    @Column(name = "user_like_categories")
    String likeCategories;

    @Column(name = "user_dislike_categories")
    String dislikeCategories;

    @Column(name = "user_height")
    Integer height;

    @Column(name = "user_weight")
    Integer weight;

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfileImage(String profileImagePath) {
        this.profileImage = profileImagePath;
    }

    public void updateLikeCategories(String likeCategories) {
        this.likeCategories = likeCategories;
    }

    public void updateDislikeCategories(String dislikeCategories) {
        this.dislikeCategories = dislikeCategories;
    }

    public void updateHeight(int height) {
        this.height = height;
    }

    public void updateWeight(int weight) {
        this.weight = weight;
    }

}
