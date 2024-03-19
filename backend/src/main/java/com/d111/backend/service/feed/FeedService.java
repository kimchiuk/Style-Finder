package com.d111.backend.service.feed;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.feed.reponse.FeedCreateResponse;
import com.d111.backend.dto.feed.reponse.FeedDeleteResponse;
import com.d111.backend.dto.feed.reponse.FeedListReadResponse;
import com.d111.backend.dto.feed.reponse.FeedReadResponse;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FeedService {

    ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest, CoordiCreateRequest coordiCreateRequest, MultipartFile feedThumbnail);

    ResponseEntity<FeedListReadResponse> readList();

    ResponseEntity<FeedReadResponse> read(Long feedId);

    ResponseEntity<FeedDeleteResponse> delete(Long feedId);

    ResponseEntity<?> feedLikes(Long feedId);


    // coordiId로 조회 후 삭제
//    ResponseEntity<FeedDeleteResponse> delete(String coordiId);

    // coordiId로 조회 상세 조회
//    ResponseEntity<FeedReadResponse> read(String coordiId);

}


