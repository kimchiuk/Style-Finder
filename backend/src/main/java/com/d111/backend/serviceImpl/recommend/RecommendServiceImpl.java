package com.d111.backend.serviceImpl.recommend;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.d111.backend.dto.recommend.request.RecommendListRequestDTO;
import com.d111.backend.dto.recommend.response.ClothResponseDTO;
import com.d111.backend.dto.recommend.response.RecommendListResponseDTO;
import com.d111.backend.exception.recommend.ItemImageIOException;
import com.d111.backend.service.recommend.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름

    List<String> TOP = Arrays.asList("탑", "블라우스", "티셔츠", "니트웨어", "셔츠", "브라탑", "후드티");
    List<String> BOTTOM = Arrays.asList("청바지", "팬츠", "스커트", "래깅스", "조거팬츠");
    List<String> OUTER = Arrays.asList("코트", "재킷", "점퍼", "패딩", "베스트", "가디건", "짚업");
    List<String> DRESS = Arrays.asList("드레스", "점프수트");

    @Override
    public ResponseEntity<RecommendListResponseDTO>recommendItems(RecommendListRequestDTO recommendListRequestDTO) {
        StringBuilder outerApiUrl = new StringBuilder("http://j10d111.p.ssafy.io:8000/get_outer_items/?");
        StringBuilder topApiUrl = new StringBuilder("http://j10d111.p.ssafy.io:8000/get_top_items/?");
        StringBuilder bottomApiUrl = new StringBuilder("http://j10d111.p.ssafy.io:8000/get_bottom_items/?");
        StringBuilder dressApiUrl = new StringBuilder("http://j10d111.p.ssafy.io:8000/get_dress_items/?");

        for (String style: recommendListRequestDTO.getStyle()) {
            outerApiUrl.append("style=").append(style).append("&");
            topApiUrl.append("style=").append(style).append("&");
            bottomApiUrl.append("style=").append(style).append("&");
            dressApiUrl.append("style=").append(style).append("&");
        }

        for (String category: recommendListRequestDTO.getCategory()) {
            if (TOP.contains(category)) {
                outerApiUrl.append("category=").append(category).append("&");
            } else if (BOTTOM.contains(category)) {
                outerApiUrl.append("category=").append(category).append("&");
            } else if (OUTER.contains(category)) {
                outerApiUrl.append("category=").append(category).append("&");
            } else if (DRESS.contains(category)) {
                outerApiUrl.append("category=").append(category).append("&");
            }
        }

        for (String color: recommendListRequestDTO.getColor()) {
            outerApiUrl.append("color=").append(color).append("&");
            topApiUrl.append("color=").append(color).append("&");
            bottomApiUrl.append("color=").append(color).append("&");
            dressApiUrl.append("color=").append(color).append("&");
        }

        List<ClothResponseDTO> outerResponseDTOList = getClothItems(outerApiUrl.toString());
        List<ClothResponseDTO> topResponseDTOList = getClothItems(topApiUrl.toString());
        List<ClothResponseDTO> bottomResponseDTOList = getClothItems(bottomApiUrl.toString());
        List<ClothResponseDTO> dressResponseDTOList = getClothItems(dressApiUrl.toString());

        for (ClothResponseDTO clothResponseDTO: outerResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] outerImage = getImage(storeFilePath);
            clothResponseDTO.setImage(outerImage);
        }

        for (ClothResponseDTO clothResponseDTO: topResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] topImage = getImage(storeFilePath);
            clothResponseDTO.setImage(topImage);
        }

        for (ClothResponseDTO clothResponseDTO: bottomResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] bottomImage = getImage(storeFilePath);
            clothResponseDTO.setImage(bottomImage);
        }

        for (ClothResponseDTO clothResponseDTO: dressResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] dressImage = getImage(storeFilePath);
            clothResponseDTO.setImage(dressImage);
        }

        RecommendListResponseDTO itemRecommendResponseDTO = RecommendListResponseDTO.builder()
                .outerCloth(outerResponseDTOList)
                .upperBody(topResponseDTOList)
                .lowerBody(bottomResponseDTOList)
                .dress(dressResponseDTOList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(itemRecommendResponseDTO);
    }

    @Override
    public ResponseEntity<List<ClothResponseDTO>> getStyleRecommend(String style) {
        String apiUrl = "http://j10d111.p.ssafy.io:8000/get_style_recommend?style=" + style;

        List<ClothResponseDTO> clothResponseDTOList = getClothItems(apiUrl);

        for (ClothResponseDTO clothResponseDTO : clothResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] outerImage = getImage(storeFilePath);

            clothResponseDTO.setImage(outerImage);
        }

        return ResponseEntity.status(HttpStatus.OK).body(clothResponseDTOList);
    }

    @Override
    public ResponseEntity<List<ClothResponseDTO>> getCategoryRecommend(String category) {
        String apiUrl = "http://j10d111.p.ssafy.io:8000/get_category_items?category=" + category;

        List<ClothResponseDTO> clothResponseDTOList = getClothItems(apiUrl);

        for (ClothResponseDTO clothResponseDTO : clothResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] outerImage = getImage(storeFilePath);

            clothResponseDTO.setImage(outerImage);
        }

        return ResponseEntity.status(HttpStatus.OK).body(clothResponseDTOList);
    }

    @Override
    public ResponseEntity<List<ClothResponseDTO>> getColorRecommend(String color) {
        String apiUrl = "http://j10d111.p.ssafy.io:8000/get_color_items?color=" + color;

        List<ClothResponseDTO> clothResponseDTOList = getClothItems(apiUrl);

        for (ClothResponseDTO clothResponseDTO : clothResponseDTOList) {
            String storeFilePath = clothResponseDTO.getImageUrl();
            byte[] outerImage = getImage(storeFilePath);

            clothResponseDTO.setImage(outerImage);
        }

        return ResponseEntity.status(HttpStatus.OK).body(clothResponseDTOList);
    }

    public List<ClothResponseDTO> getOuterClothItems(String apiUrl) {
        // RestTemplate 인스턴스 생성
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Map<String, Object>> responses = restTemplate.getForObject(apiUrl, List.class);

        List<ClothResponseDTO> clothResponseDTOList = new ArrayList<>();

        for (Map<String, Object> response: responses) {
            Integer filename = (Integer) response.get("데이터셋 정보_파일 번호");
            String style = (String) response.get("데이터셋 정보_데이터셋 상세설명_라벨링_스타일_0_스타일");
            String category = (String) response.get("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리");
            String color = (String) response.get("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상");

            clothResponseDTOList.add(
                    ClothResponseDTO.builder()
                            .imageUrl("big_date_image/" + filename + ".jpg")
                            .style(style)
                            .category(category)
                            .color(color)
                            .build()
            );
        }

        // FastAPI 서버에 POST 요청 보내기
        return clothResponseDTOList;
    }

    public List<ClothResponseDTO> getClothItems(String apiUrl) {
        // RestTemplate 인스턴스 생성
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Map<String, Object>> responses = restTemplate.getForObject(apiUrl, List.class);

        List<ClothResponseDTO> clothResponseDTOList = new ArrayList<>();

        String[] categoryKeys = {
                "데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리",
                "데이터셋 정보_데이터셋 상세설명_라벨링_드레스_0_카테고리",
                "데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_카테고리",
                "데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_카테고리"
        };

        String[] colorKeys = {
                "데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상",
                "데이터셋 정보_데이터셋 상세설명_라벨링_드레스_0_색상",
                "데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상",
                "데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"
        };

        for (Map<String, Object> response: responses) {
            Integer filename = (Integer) response.get("데이터셋 정보_파일 번호");
            String style = (String) response.get("데이터셋 정보_데이터셋 상세설명_라벨링_스타일_0_스타일");
            String category = null;
            String color = null;

            for (String key : categoryKeys) {
                category = (String) response.get(key);
                if (category != null) break;
            }

            for (String key : colorKeys) {
                color = (String) response.get(key);
                if (color != null) break;
            }

            clothResponseDTOList.add(
                    ClothResponseDTO.builder()
                            .imageUrl("big_date_image/" + filename + ".jpg")
                            .style(style)
                            .category(category)
                            .color(color)
                            .build()
            );
        }

        // FastAPI 서버에 POST 요청 보내기
        return clothResponseDTOList;
    }

    public byte[] getImage(String storeFilePath) {
        try {
            // 파일 이름을 사용하여 S3에서 이미지를 가져옴
            GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, storeFilePath);
            S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
            S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();

            return IOUtils.toByteArray(s3ObjectInputStream);
        } catch (IOException exception) {
            throw new ItemImageIOException("이미지를 불러오지 못했습니다.");
        } catch (AmazonS3Exception exception) {
            throw new ItemImageIOException("저장된 이미지가 없습니다.");
        }
    }

}
