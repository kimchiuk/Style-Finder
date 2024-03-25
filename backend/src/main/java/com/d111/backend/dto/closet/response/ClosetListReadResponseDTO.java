package com.d111.backend.dto.closet.response;

import com.d111.backend.entity.closet.Part;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClosetListReadResponseDTO {

    private String image;

    private Enum<Part> part;

    private List<String> categories;

    private List<String> details;

    private List<String> textures;

}
