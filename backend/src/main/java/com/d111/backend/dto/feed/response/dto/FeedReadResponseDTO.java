package com.d111.backend.dto.feed.response.dto;

import com.d111.backend.dto.coordi.response.dto.CoordiContainer;
import com.d111.backend.entity.coordi.Coordi;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedReadResponseDTO {

    @Schema(description = "아우터", example = "패딩")
    private String outerCloth;

    @Schema(description = "상의", example = "티셔츠")
    private String upperBody;

    @Schema(description = "하의", example = "바지")
    private String lowerBody;

    @Schema(description = "원피스", example = "원피스")
    private String dress;

    @Schema(description = "피드 작성자")
    private FeedUserDTO user;

    @Schema(description = "최초 등록자", example = "킹치욱")
    private Long originWriter;

    @Schema(description = "피드 제목", example = "멋있는 코디")
    private String feedTitle;

    @Schema(description = "피드 썸네일", example = "example.com")
    private byte[] feedThumbnail;

    @Schema(description = "피드 내용", example = "내용입니다")
    private String feedContent;

    @Schema(description = "피드 생성일")
    private LocalDate feedCreatedDate;

    @Schema(description = "피드 수정일")
    private LocalDate feedUpdatedDate;

    @Schema(description = "피드 좋아요")
    private Long feedLikes;

    private CoordiContainer coordiContainer;

    @Schema(description = "댓글 목록")
    private List<FeedCommentDTO> comments;

}
