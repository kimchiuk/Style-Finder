package com.d111.backend.serviceImpl.coordi;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.coordi.response.CoordiCreateResponse;
import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.service.coordi.MongoCoordiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoCoordiServiceImpl implements MongoCoordiService {

    private final MongoCoordiRepository mongoCoordiRepository;

    @Override
    public ResponseEntity<CoordiCreateResponse> createCoordi(CoordiCreateRequest coordiCreateRequest) {

        Coordi coordi = Coordi.createCoordi(coordiCreateRequest);
        mongoCoordiRepository.save(coordi);
        CoordiCreateResponse response = CoordiCreateResponse.createCoordiCreateResponse(
                "success",
                true
        );
        return ResponseEntity.ok(response);
    }
}
