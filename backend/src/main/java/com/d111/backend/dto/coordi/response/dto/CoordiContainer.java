    package com.d111.backend.dto.coordi.response.dto;

    import com.d111.backend.entity.coordi.Coordi;
    import com.d111.backend.repository.mongo.MongoCoordiRepository;
    import io.swagger.v3.oas.annotations.media.Schema;
    import jakarta.persistence.Entity;
    import jakarta.persistence.Id;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.Optional;


    @Data
    @Entity
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public class CoordiContainer {

        @Id
        private String id;

        @Schema(description = "아우터", example = "패딩")
        private String outerCloth;

        @Schema(description = "상의", example = "티셔츠")
        private String upperBody;

        @Schema(description = "하의", example = "바지")
        private String lowerBody;

        @Schema(description = "원피스", example = "원피스")
        private String dress;

        public static CoordiContainer createMongoContainer(String coordiId, MongoCoordiRepository mongoCoordiRepository) {

            Optional<Coordi> coordi = mongoCoordiRepository.findById(coordiId);

            CoordiContainer mongoContainer = CoordiContainer.builder()
                    .id(coordi.get().get_id())
                    .outerCloth(coordi.get().getOuterCloth())
                    .upperBody(coordi.get().getUpperBody())
                    .lowerBody(coordi.get().getLowerBody())
                    .dress(coordi.get().getDress())
                    .build();

            return mongoContainer;
        }
    }
