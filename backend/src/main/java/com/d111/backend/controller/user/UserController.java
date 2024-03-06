package com.d111.backend.controller.user;

import com.d111.backend.dto.user.request.SignInRequestDTO;
import com.d111.backend.dto.user.request.SignUpRequestDTO;
import com.d111.backend.dto.user.response.SignInResponseDTO;
import com.d111.backend.exception.user.EmailNotFoundException;
import com.d111.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "User", description = "User API")
@RequestMapping("/api/user")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = SignUpRequestDTO.class)))
    })
    @PostMapping(value = "/signUp")
    ResponseEntity signUp(@RequestPart(value = "signUpRequest") SignUpRequestDTO signUpRequestDTO,
                          @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        return userService.signUp(signUpRequestDTO, profileImage);
    }

    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(implementation = SignInResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "가입되지 않은 회원", content = @Content)
    })
    @PostMapping(value = "/signIn")
    ResponseEntity<SignInResponseDTO> signIn(@RequestBody SignInRequestDTO signInRequest) {
        return userService.signIn(signInRequest);
    }

}
