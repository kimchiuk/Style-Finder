package com.d111.backend.util;

import com.d111.backend.exception.user.CustomJWTException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JWTUtil {

    static SecretKey key = Jwts.SIG.HS256.key().build();

    public static String createToken(Map<String, Object> claims, int minute){
        return Jwts.builder()
                .signWith(key)
                .expiration(Date.from(ZonedDateTime.now().plusMinutes(minute).toInstant()))
                .subject("USER")
                .claims(claims)
                .compact();
    }

    public static Map<String, Object> validateToken(String token) {

        Map<String, Object> claim = null;

        try{
            claim = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token) // 파싱 및 검증, 실패 시 에러
                    .getPayload();
        }catch(MalformedJwtException malformedJwtException){
            throw new CustomJWTException("MalFormed");
        }catch(ExpiredJwtException expiredJwtException){
            throw new CustomJWTException("Expired");
        }catch(InvalidClaimException invalidClaimException){
            throw new CustomJWTException("Invalid");
        }catch(JwtException jwtException){
            throw new CustomJWTException("JWTError");
        }catch(Exception e){
            throw new CustomJWTException("Error");
        }

        return claim;
    }
}
