package com.d111.backend.dto.user.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignInRequestDTO {

    @Schema(name = "이메일")
    String email;

    @Schema(name = "비밀번호")
    String password;

}