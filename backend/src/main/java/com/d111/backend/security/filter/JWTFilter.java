package com.d111.backend.security.filter;


import com.d111.backend.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Log4j2
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String path = request.getRequestURI();

        if (path.startsWith("/api/user/")) {
            return true;
        }

        // Swagger UI 경로
        if (path.startsWith("/swagger-ui/")) {
            return true;
        }
        
        // Swagger API 경로
        if (path.startsWith("/v3/api-docs")) {
            return true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorization == null || !authorization.startsWith("Bearer ")){
            UnauthorizedError(response);
            return;
        }

        //token 꺼내기
        String accessToken = authorization.split(" ")[1];
        log.info("token : " + accessToken);

        Map<String, Object> claim = JWTUtil.validateToken(accessToken);

        log.info(claim.get("email"));

        // 인증된 사용자를 나타내는 토큰 객체를 생성하고, 권한 정보를 설정
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(claim, null, List.of(new SimpleGrantedAuthority("USER")));

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);
    }

    private void UnauthorizedError(HttpServletResponse response) throws IOException {
        Gson gson = new Gson();

        String message = gson.toJson(Collections.singletonMap("message", "AUTHORIZATION_HEADER_ERROR"));

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        PrintWriter printWriter = response.getWriter();
        printWriter.println(message);
        printWriter.close();
    }

}
