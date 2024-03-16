package com.d111.backend.serviceImpl.feed;

import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.repository.mongo.MongoCoordiRepository;
import com.d111.backend.service.feed.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final MongoCoordiRepository mongoCoordiRepository2;

    @Override
    public ResponseEntity<List<Coordi>> read() {
        List<Coordi> coordiList = mongoCoordiRepository2.findAll();
        return ResponseEntity.ok(coordiList);
    }
}
