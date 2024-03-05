package com.d111.backend.serviceImpl.user;

import com.d111.backend.dto.sample.request.SignUpRequestDTO;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.user.ExistedEmailException;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity signUp(SignUpRequestDTO signUpRequestDTO, MultipartFile profileImage) {
        Optional<User> user = Optional.of(userRepository.findByEmail(signUpRequestDTO.getEmail()));

//        if (user.getEmail().equals(signUpRequestDTO.getEmail())) {
//            throw new ExistedEmailException("이미 가입한 이메일입니다.");
//        }

        // S3 연동 후 프로필 이미지 로직 구현 예정
        String profileImageUrl = "";

        User newUser = User.builder()
                .email(signUpRequestDTO.getEmail())
                .password(signUpRequestDTO.getPassword())
                .nickname(signUpRequestDTO.getNickname())
                .likeCategories(signUpRequestDTO.getLikeCategories())
                .dislikeCategories(signUpRequestDTO.getDislikeCategories())
                .height(signUpRequestDTO.getHeight())
                .weight(signUpRequestDTO.getWeight())
                .profileImage(profileImageUrl)
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("SignUp Success");
    }

}
