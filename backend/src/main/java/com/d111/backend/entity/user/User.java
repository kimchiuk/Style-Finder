package com.d111.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_id", length = 50, nullable = false, unique = true)
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

}
