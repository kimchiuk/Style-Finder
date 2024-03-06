package com.d111.backend.serviceImpl.user;

import com.d111.backend.dto.user.request.SignInRequestDTO;
import com.d111.backend.dto.user.request.SignUpRequestDTO;
import com.d111.backend.dto.user.response.SignInResponseDTO;
import com.d111.backend.entity.user.User;
import com.d111.backend.exception.user.EmailNotFoundException;
import com.d111.backend.exception.user.ExistedEmailException;
import com.d111.backend.exception.user.PasswordNotMatchException;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity signUp(SignUpRequestDTO signUpRequestDTO, MultipartFile profileImage) {
        Optional<User> user = userRepository.findByEmail(signUpRequestDTO.getEmail());

        user.ifPresent(findUser -> { throw new ExistedEmailException("이미 가입한 이메일입니다."); });

        // S3 연동 후 프로필 이미지 로직 구현 예정
        String profileImageUrl = "";

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
                .profileImage(profileImageUrl)
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("SignUp Success");
    }

    @Override
    public ResponseEntity<SignInResponseDTO> signIn(SignInRequestDTO signInRequestDTO) {
        User user = userRepository.findByEmail(signInRequestDTO.getEmail()).orElseThrow(() -> new EmailNotFoundException("일치하는 이메일이 없습니다."));

        if (!passwordEncoder.matches(signInRequestDTO.getPassword(), user.getPassword())) {
            throw new PasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        }

        SignInResponseDTO signInResponseDTO = SignInResponseDTO.builder()
                .nickname(user.getNickname())
                .likeCategories(user.getLikeCategories())
                .dislikeCategories(user.getDislikeCategories())
                .height(user.getHeight())
                .weight(user.getWeight())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(signInResponseDTO);
    }

}
