package com.d111.backend.serviceImpl.user;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.d111.backend.dto.user.request.SignInRequestDTO;
import com.d111.backend.dto.user.request.SignUpRequestDTO;
import com.d111.backend.dto.user.request.TokenReissueRequestDTO;
import com.d111.backend.dto.user.request.UpdateUserInfoRequestDTO;
import com.d111.backend.dto.user.response.SignInResponseDTO;
import com.d111.backend.dto.user.response.TokenReissueResponseDTO;
import com.d111.backend.dto.user.response.UpdateUserInfoResponseDTO;
import com.d111.backend.entity.multipart.S3File;
import com.d111.backend.entity.user.RefreshToken;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.user.*;
import com.d111.backend.repository.s3.S3Repository;
import com.d111.backend.repository.user.RefreshTokenRepository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.user.UserService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3Repository s3Repository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AmazonS3Client amazonS3Client;

    @Value("${DEFAULT_PROFILE_URL}")
    private String DEFAULT_PROFILE_URL;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름

    @Override
    @Transactional
    public ResponseEntity signUp(SignUpRequestDTO signUpRequestDTO, MultipartFile profileImage) {
        Optional<User> user = userRepository.findByEmail(signUpRequestDTO.getEmail());

        user.ifPresent(findUser -> { throw new ExistedEmailException("이미 가입한 이메일입니다."); });

        // S3 bucket에 프로필 이미지 저장
        String storeFilePath;

        if (profileImage.isEmpty()) {
            storeFilePath = DEFAULT_PROFILE_URL;
        } else {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentEncoding(profileImage.getContentType());
            objectMetadata.setContentLength(profileImage.getSize());

            String originalFileFullName = profileImage.getOriginalFilename();
            String originalFileName = originalFileFullName.substring(originalFileFullName.lastIndexOf(".") + 1);

            String storeFileName = UUID.randomUUID() + "." + originalFileName;
            storeFilePath = "PROFILE/" + storeFileName;

            try {
                PutObjectRequest putObjectRequest = new PutObjectRequest(
                        bucket, storeFilePath, profileImage.getInputStream(), objectMetadata
                );

                amazonS3Client.putObject(putObjectRequest);
            } catch (IOException e) {
                throw new ProfileImageIOException("프로필 이미지 저장에 실패하였습니다.");
            }

            S3File s3File = new S3File(originalFileFullName, storeFileName, storeFilePath);
            s3Repository.upload(s3File);
        }

        // List<String> -> String
        String likeCategories = String.join(",", signUpRequestDTO.getLikeCategories());
        String dislikeCategories = String.join(",", signUpRequestDTO.getDislikeCategories());

        User newUser = User.builder()
                .email(signUpRequestDTO.getEmail())
                .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .nickname(signUpRequestDTO.getNickname())
                .likeCategories(likeCategories)
                .dislikeCategories(dislikeCategories)
                .height(signUpRequestDTO.getHeight())
                .weight(signUpRequestDTO.getWeight())
                .profileImage(storeFilePath)
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("SignUp Success");
    }

    @Override
    public ResponseEntity<SignInResponseDTO> signIn(SignInRequestDTO signInRequestDTO) {
        // 이메일 유무 판단
        User user = userRepository.findByEmail(signInRequestDTO.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("일치하는 이메일이 없습니다."));

        // 비밀번호 일치 여부 판단
        if (!passwordEncoder.matches(signInRequestDTO.getPassword(), user.getPassword())) {
            throw new PasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }

        // 프로필 이미지 binary 타입으로 불러오기
        byte[] profileImage;

        String storeFilePath = user.getProfileImage();

        try {
            GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, storeFilePath);

            S3Object s3Object = amazonS3Client.getObject(getObjectRequest);
            S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();

            profileImage = IOUtils.toByteArray(s3ObjectInputStream);
        } catch (IOException exception) {
            throw new ProfileImageIOException("프로필 이미지를 불러오지 못했습니다.");
        } catch (AmazonS3Exception exception) {
            throw new ProfileImageIOException("저장된 프로필 이미지가 없습니다.");
        }

        // JWT 토큰 생성
        String userEmail = signInRequestDTO.getEmail();

        String accessToken = JWTUtil.createToken(userEmail, 1);
        String refreshToken = JWTUtil.createToken(userEmail, 5);

        refreshTokenRepository.save(RefreshToken.builder()
                        .email(userEmail)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build());

        List<String> likeCategories = Arrays.asList(user.getLikeCategories().split(","));
        List<String> dislikeCategories = Arrays.asList(user.getDislikeCategories().split(","));

        // 로그인 응답 정보 생성
        SignInResponseDTO signInResponseDTO = SignInResponseDTO.builder()
                .nickname(user.getNickname())
                .likeCategories(likeCategories)
                .dislikeCategories(dislikeCategories)
                .height(user.getHeight())
                .weight(user.getWeight())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .profileImage(profileImage)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(signInResponseDTO);
    }

    @Override
    public ResponseEntity<TokenReissueResponseDTO> tokenReissue(TokenReissueRequestDTO tokenReissueRequestDTO) {
        RefreshToken refreshToken =
                refreshTokenRepository.findById(tokenReissueRequestDTO.getRefreshToken())
                        .orElseThrow(() -> new RefreshTokenNotFoundException("리프레시 토큰이 유효하지 않습니다."));

        String accessToken = JWTUtil.createToken(refreshToken.getEmail(), 10);

        TokenReissueResponseDTO tokenReissueResponseDTO = TokenReissueResponseDTO.builder()
                .accessToken(accessToken)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(tokenReissueResponseDTO);
    }

    @Override
    @Transactional
    public ResponseEntity<UpdateUserInfoResponseDTO> updateUserInfo(UpdateUserInfoRequestDTO updateUserInfoRequestDTO,
                                                                    MultipartFile profileImage) {
        String email = JWTUtil.findEmailByToken();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("유저 정보가 존재하지 않습니다."));

        // 프로필 이미지 변경 요청이 있을 경우
        if (!profileImage.isEmpty()) {
            String storeFilePath;

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentEncoding(profileImage.getContentType());
            objectMetadata.setContentLength(profileImage.getSize());

            String originalFileFullName = profileImage.getOriginalFilename();
            String originalFileName = originalFileFullName.substring(originalFileFullName.lastIndexOf(".") + 1);

            String storeFileName = UUID.randomUUID() + "." + originalFileName;
            storeFilePath = "PROFILE/" + storeFileName;

            try {
                PutObjectRequest putObjectRequest = new PutObjectRequest(
                        bucket, storeFilePath, profileImage.getInputStream(), objectMetadata
                );

                amazonS3Client.putObject(putObjectRequest);

                user.updateProfileImage(storeFilePath);
            } catch (IOException e) {
                throw new ProfileImageIOException("프로필 이미지 저장에 실패하였습니다.");
            }

            S3File s3File = new S3File(originalFileFullName, storeFileName, storeFilePath);
            s3Repository.upload(s3File);
        }

        // 닉네임에 대한 입력값이 없을 경우
        if (updateUserInfoRequestDTO.getNickname().isBlank()) {
            throw new InvalidInputException("닉네임을 입력해주세요.");
        }

        user.updateNickname(updateUserInfoRequestDTO.getNickname());
        
        // List<String> -> String
        String likeCategories = String.join(",", updateUserInfoRequestDTO.getLikeCategories());
        String dislikeCategories = String.join(",", updateUserInfoRequestDTO.getDislikeCategories());

        user.updateLikeCategories(likeCategories);
        user.updateDislikeCategories(dislikeCategories);

        user.updateHeight(updateUserInfoRequestDTO.getHeight());
        user.updateWeight(updateUserInfoRequestDTO.getWeight());

        userRepository.save(user);

        UpdateUserInfoResponseDTO updateUserInfoResponseDTO = UpdateUserInfoResponseDTO.builder()
                .nickname(user.getNickname())
                .likeCategories(likeCategories)
                .dislikeCategories(dislikeCategories)
                .height(user.getHeight())
                .weight(user.getWeight())
                .build();

        try {
            updateUserInfoResponseDTO.setProfileImage(profileImage.getBytes());
        } catch (IOException exception) {
            throw new ProfileImageIOException("프로필 이미지 전송 과정 중 오류가 발생했습니다.");
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(updateUserInfoResponseDTO);
    }

}
