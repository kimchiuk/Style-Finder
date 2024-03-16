package com.d111.backend.serviceImpl.coordi;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.coordi.response.CoordiCreateResponse;
import com.d111.backend.dto.coordi.response.CoordiReadResponse;
import com.d111.backend.dto.coordi.response.dto.CoordiReadResponseDTO;
import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.entity.user.User;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.repository.user.UserRepository;
import com.d111.backend.service.coordi.MongoCoordiService;
import com.d111.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MongoCoordiServiceImpl implements MongoCoordiService {

    private final MongoCoordiRepository mongoCoordiRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<CoordiCreateResponse> create(CoordiCreateRequest coordiCreateRequest) {

        String userid = JWTUtil.findEmailByToken();
        Optional<User> currentUser = userRepository.findByEmail(userid);
        Coordi coordi = Coordi.createCoordi(coordiCreateRequest, currentUser);
        LocalDate localDate = LocalDate.now();
        Instant instant = localDate.atStartOfDay(ZoneId.of("UTC")).toInstant();
        coordi.setTimestamp(instant);
        mongoCoordiRepository.save(coordi);
        CoordiCreateResponse response = CoordiCreateResponse.createCoordiCreateResponse(
                "success",
                true
        );
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CoordiReadResponse> read(String id) {
        Optional<Coordi> coordi = mongoCoordiRepository.findById(id);


        CoordiReadResponse response = CoordiReadResponse.createCoordiReadResponse(
                "Success",
                CoordiReadResponseDTO.createCoordiReadResponseDTO(coordi)
        );
        return ResponseEntity.ok(response);
    }

}