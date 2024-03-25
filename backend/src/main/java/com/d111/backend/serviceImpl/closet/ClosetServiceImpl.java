package com.d111.backend.serviceImpl.closet;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.d111.backend.dto.closet.response.ClosetListReadResponseDTO;
import com.d111.backend.dto.closet.response.ClosetUploadResponseDTO;
import com.d111.backend.entity.closet.Closet;
import com.d111.backend.entity.closet.Part;
import com.d111.backend.entity.multipart.S3File;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.closet.ClosetImageIOException;
import com.d111.backend.exception.closet.ClosetNotFoundException;
import com.d111.backend.exception.user.EmailNotFoundException;
import com.d111.backend.exception.user.ProfileImageIOException;
import com.d111.backend.exception.user.UnauthorizedAccessException;
import com.d111.backend.repository.closet.ClosetRepository;
import com.d111.backend.repository.s3.S3Repository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.closet.ClosetService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class ClosetServiceImpl implements ClosetService {

    private final ClosetRepository closetRepository;
    private final UserRepository userRepository;
    private final S3Repository s3Repository;
    private final AmazonS3Client amazonS3Client;

    // FastAPI 서버의 엔드포인트 URL
    private final String FAST_API_ENDPOINT = "http://localhost:8000/closet";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름

    @Override
    @Transactional
    public ResponseEntity<ClosetUploadResponseDTO> uploadCloset(String part, MultipartFile clothImage) {
        String email = JWTUtil.findEmailByToken();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("토큰에 포함된 이메일이 정확하지 않습니다."));

        String storeFilePath;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentEncoding(clothImage.getContentType());
        objectMetadata.setContentLength(clothImage.getSize());

        String originalFileFullName = clothImage.getOriginalFilename();
        String originalFileName = originalFileFullName.substring(originalFileFullName.lastIndexOf(".") + 1);

        String storeFileName = UUID.randomUUID() + "." + originalFileName;
        storeFilePath = "CLOSET/" + storeFileName;

        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, storeFilePath, clothImage.getInputStream(), objectMetadata
            );

            amazonS3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new ProfileImageIOException("패션 아이템 이미지 저장에 실패하였습니다.");
        }

        S3File s3File = new S3File(originalFileFullName, storeFileName, storeFilePath);
        s3Repository.upload(s3File);

        ClosetUploadResponseDTO responseBody = closetAttributeClassifier(storeFilePath, clothImage).getBody();

        String categories = String.join(",", responseBody.getCategory());
        String details = String.join(",", responseBody.getDetail());
        String textures = String.join(",", responseBody.getTexture());

        Closet closet = Closet.builder()
                .categories(categories)
                .details(details)
                .textures(textures)
                .image(storeFilePath)
                .userId(user)
                .part(Part.valueOf(part))
                .build();

        user.addCloset(closet);

        userRepository.save(user);
        closetRepository.save(closet);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    @Override
    public ResponseEntity<List<ClosetListReadResponseDTO>> getClosets() {
        String email = JWTUtil.findEmailByToken();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("토큰에 포함된 이메일이 정확하지 않습니다."));

        log.info(user.getClosets());

        List<Closet> closets = user.getClosets();

        List<ClosetListReadResponseDTO> closetListReadResponseDTOList = new ArrayList<>();

        for (Closet closet: closets) {
            List<String> categories = Arrays.asList(closet.getCategories().split(","));
            List<String> details = Arrays.asList(closet.getDetails().split(","));
            List<String> textures = Arrays.asList(closet.getTextures().split(","));

            ClosetListReadResponseDTO closetListReadResponseDTO = ClosetListReadResponseDTO.builder()
                    .image(closet.getImage())
                    .categories(categories)
                    .details(details)
                    .textures(textures)
                    .part(closet.getPart())
                    .build();

            closetListReadResponseDTOList.add(closetListReadResponseDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(closetListReadResponseDTOList);
    }

    @Override
    public ResponseEntity<String> deleteCloset(Long closetId) {
        String email = JWTUtil.findEmailByToken();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("토큰에 포함된 이메일이 정확하지 않습니다."));

        Closet closet = closetRepository.findById(closetId)
                .orElseThrow(() -> new ClosetNotFoundException("해당하는 옷이 없습니다."));

        if (!closet.getUserId().getEmail().equals(email)) {
            throw new UnauthorizedAccessException("해당 옷의 주인이 아닙니다.");
        }

        user.deleteCloset(closet);

        userRepository.save(user);
        closetRepository.delete(closet);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제가 완료되었습니다.");
    }

    public ResponseEntity<ClosetUploadResponseDTO> closetAttributeClassifier(String storeFilePath, MultipartFile clothImage) {
        // RestTemplate 인스턴스 생성
        RestTemplate restTemplate = new RestTemplate();

        // 파일 객체 생성
        File file = new File(storeFilePath);

        byte[] fileBytes;

        try {
            fileBytes = clothImage.getBytes();
        } catch (IOException exception) {
            throw new ClosetImageIOException("옷 이미지가 저장되어 있지 않습니다.");
        }

        // ByteArrayResource를 사용하여 파일을 변환
        ByteArrayResource byteArrayResource = new ByteArrayResource(fileBytes) {
            @Override
            public String getFilename() {
                return file.getName();
            }
        };

        MultiValueMap<String, Object> bodyMap = new LinkedMultiValueMap<>();
        bodyMap.add("file", byteArrayResource);

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // HTTP 요청 엔티티 생성
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(bodyMap, headers);

        // FastAPI 서버에 POST 요청 보내기
        return restTemplate.postForEntity(FAST_API_ENDPOINT, requestEntity, ClosetUploadResponseDTO.class);
    }

}
