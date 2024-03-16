package com.d111.backend.entity.coordi;


import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.entity.feed.Feed;
import com.d111.backend.entity.user.User;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.Instant;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Coordi")
public class Coordi {

    @Id
    private String _id;
    private String head;
    private String upperBody;
    private String lowerBody;
    private String shoes;
    private Instant timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "feed_id") // 이 부분은 실제로 데이터베이스에 저장되는 외래 키를 지정합니다.
    private Feed feed;

    public static Coordi createCoordi(CoordiCreateRequest coordiCreateRequest, Optional<User> currentUser) {
        User user = currentUser.orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        Coordi coordi = new Coordi();
        coordi.setUser(user);
        coordi.setHead(coordiCreateRequest.getHead());
        coordi.setUpperBody(coordiCreateRequest.getUpperBody());
        coordi.setLowerBody(coordiCreateRequest.getLowerBody());
        coordi.setShoes(coordiCreateRequest.getShoes());
        return coordi;
    }
}
