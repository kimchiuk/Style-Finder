package com.d111.backend.service.user;

import com.d111.backend.dto.user.request.SignInRequestDTO;
import com.d111.backend.dto.user.request.SignUpRequestDTO;
import com.d111.backend.dto.user.response.SignInResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    ResponseEntity signUp(SignUpRequestDTO signUpRequestDTO, MultipartFile profileImage);

    ResponseEntity<SignInResponseDTO> signIn(SignInRequestDTO signInRequestDTO);

}
