package com.d111.backend.service.feed;

import com.d111.backend.entity.coordi.Coordi;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FeedService {

    ResponseEntity<List<Coordi>> read();
}
