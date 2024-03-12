package com.d111.backend.serviceImpl.mongo;

import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.service.mongo.MongoCoordiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoCoordiServiceImpl implements MongoCoordiService {

    private final MongoCoordiRepository mongoCoordiRepository;

    @Override
    public Coordi getCoordiById(String coordiId) {
        return mongoCoordiRepository.findById(coordiId).orElse(null);
    }
}
