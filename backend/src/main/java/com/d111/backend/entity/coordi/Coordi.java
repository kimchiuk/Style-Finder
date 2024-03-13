package com.d111.backend.entity.coordi;


import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Coordi")
public class Coordi {

    @Id
    private String id;

    private String coordiId;
    private String userId;
    private String head;
    private String upperBody;
    private String lowerBody;
    private String shoes;

    public static Coordi createCoordi(CoordiCreateRequest coordiCreateRequest){
        return Coordi.builder()
                .head(coordiCreateRequest.getHead())
                .upperBody(coordiCreateRequest.getUpperBody())
                .lowerBody(coordiCreateRequest.getLowerBody())
                .shoes(coordiCreateRequest.getShoes())
                .build();
    }
}
