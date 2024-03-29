package com.d111.backend.serviceImpl.recommend;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.d111.backend.dto.recommend.response.ItemRecommendResponseDTO;
import com.d111.backend.exception.recommend.ItemImageIOException;
import com.d111.backend.service.recommend.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름

    @Override
    public ResponseEntity<List<ItemRecommendResponseDTO>>recommendItems(String items, String detailCategory) {

        System.out.println("이상하네");

        List<String> fileNames = new ArrayList<>();
        String encodedCategory = URLEncoder.encode(detailCategory, StandardCharsets.UTF_8);
        String apiUrl = "http://j10d111.p.ssafy.io:8000/get_" + items +"_items/?" + items + "_category=" + encodedCategory;


        try {
            URL url = new URL(apiUrl);

            // HttpURLConnection 객체 생성
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // 요청 메소드 설정 (GET, POST 등)
            connection.setRequestMethod("GET");

            // 응답 내용 읽기
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();


            JSONArray filesArray = new JSONArray(response.toString());
//            for (int i = 0; i < filesArray.length(); i++) {
//                JSONObject obj = filesArray.getJSONObject(i);
//                int fileId = obj.getInt("데이터셋 정보_파일 번호");
//                fileNames.add(String.valueOf(fileId));
//            }


            // 일단 4개씩만 조회
            for (int i = 0; i < 4; i++) {
                JSONObject obj = filesArray.getJSONObject(i);
                int fileId = obj.getInt("데이터셋 정보_파일 번호");
                fileNames.add(String.valueOf(fileId));
            }


            // 연결 해제
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<ItemRecommendResponseDTO> itemRecommendResponseDTOList = new ArrayList<>();

        System.out.println(fileNames);

        for (String fileName : fileNames) {
            byte[] outerImage;

            String storeFilePath = "big_date_image/" + fileName + ".jpg" ; // 수정된 부분

            System.out.println(storeFilePath + "경로");
            try {
                // 파일 이름을 사용하여 S3에서 이미지를 가져옴
                GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, storeFilePath);
                S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
                S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();

                outerImage = IOUtils.toByteArray(s3ObjectInputStream);

            } catch (IOException exception) {
                throw new ItemImageIOException("이미지를 불러오지 못했습니다.");
            } catch (AmazonS3Exception exception) {
                throw new ItemImageIOException("저장된 이미지가 없습니다.");
            }

            ItemRecommendResponseDTO itemRecommendResponseDTO = ItemRecommendResponseDTO.builder()
                    .outerImage(outerImage)
                    .build();

            itemRecommendResponseDTOList.add(itemRecommendResponseDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(itemRecommendResponseDTOList);
    }


}
