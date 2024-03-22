package com.d111.backend.entity.comment;

import com.d111.backend.entity.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    public Long id;

    @Column(name = "comment_content")
    public String content;

    @Column(name = "comment_create_date")
    public LocalDateTime createDate;

    @Column(name = "comment_update_date")
    public LocalDateTime updateDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User userId;

}
