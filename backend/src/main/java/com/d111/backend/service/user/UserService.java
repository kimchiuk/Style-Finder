package com.d111.backend.service.user;

import com.d111.backend.dto.sample.request.SignUpRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    ResponseEntity signUp(SignUpRequestDTO signUpRequestDTO, MultipartFile profileImage);

}
