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

        @Schema(description = "머리", example = "모자")
        private String outer;

        @Schema(description = "상의", example = "티셔츠")
        private String upperBody;

        @Schema(description = "하의", example = "바지")
        private String lowerBody;

        @Schema(description = "신발", example = "운동화")
        private String onepeice;

        public static CoordiContainer createMongoContainer(String coordiId, MongoCoordiRepository mongoCoordiRepository) {

            Optional<Coordi> coordi = mongoCoordiRepository.findById(coordiId);

            // 조회한 정보를 기반으로 MongoContainer 생성
            CoordiContainer mongoContainer = CoordiContainer.builder()
                    .id(coordi.get().get_id())
                    .outer(coordi.get().getOuter())
                    .upperBody(coordi.get().getUpperBody())
                    .lowerBody(coordi.get().getLowerBody())
                    .onepeice(coordi.get().getOnepiece())
                    .build();

            return mongoContainer;
        }


    }
