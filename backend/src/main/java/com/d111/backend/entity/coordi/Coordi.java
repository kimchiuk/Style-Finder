package com.d111.backend.entity.coordi;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "Coordi")
public class Coordi {

    @Id
    private String coordiId;

    private String userId;
    private String head;
    private String upperBody;
    private String lowerBody;
    private String shoes;
}
