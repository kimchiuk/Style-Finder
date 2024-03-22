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

    @Column(name = "outer_cloth")
    private String outerCloth;

    @Column(name = "upper_body")
    private String upperBody;

    @Column(name = "lower_body")
    private String lowerBody;

    @Column(name = "dress")
    private String dress;

    @OneToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    public static Coordi createCoordi(CoordiCreateRequest coordiCreateRequest) {
        Coordi coordi = new Coordi();
        coordi.setOuterCloth(coordiCreateRequest.getOuterCloth());
        coordi.setUpperBody(coordiCreateRequest.getUpperBody());
        coordi.setLowerBody(coordiCreateRequest.getLowerBody());
        coordi.setDress(coordiCreateRequest.getDress());
        return coordi;
    }

}
