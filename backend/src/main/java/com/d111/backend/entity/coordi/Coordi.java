package com.d111.backend.entity.coordi;


import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.entity.feed.Feed;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Coordi")
public class Coordi {

    @Id
    private String _id;

    @Column(name = "head")
    private String head;

    @Column(name = "upper_body")
    private String upperBody;

    @Column(name = "lower_body")
    private String lowerBody;

    @Column(name = "shoes")
    private String shoes;

    @OneToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    public static Coordi createCoordi(CoordiCreateRequest coordiCreateRequest) {
        Coordi coordi = new Coordi();
        coordi.setHead(coordiCreateRequest.getHead());
        coordi.setUpperBody(coordiCreateRequest.getUpperBody());
        coordi.setLowerBody(coordiCreateRequest.getLowerBody());
        coordi.setShoes(coordiCreateRequest.getShoes());
        return coordi;
    }

}
