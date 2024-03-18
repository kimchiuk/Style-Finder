package com.d111.backend.service.feed;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.feed.reponse.FeedCreateResponse;
import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import org.springframework.http.ResponseEntity;

public interface FeedService {

    ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest, CoordiCreateRequest coordiCreateRequest);

    ResponseEntity<FeedListReadResponse> readList();

    ResponseEntity<FeedReadResponse> read(String coordiId);

    ResponseEntity<FeedDeleteResponse> delete(String coordiId);
}

