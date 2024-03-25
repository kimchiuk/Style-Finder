package com.d111.backend.service.feed;

import com.d111.backend.dto.coordi.request.CoordiCreateRequest;
import com.d111.backend.dto.feed.response.*;
import com.d111.backend.dto.feed.request.FeedCreateRequest;
import com.d111.backend.dto.feed.request.FeedUpdateRequest;
import com.d111.backend.entity.feed.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FeedService {

    ResponseEntity<FeedCreateResponse> create(FeedCreateRequest feedCreateRequest, CoordiCreateRequest coordiCreateRequest, MultipartFile feedThumbnail);

    ResponseEntity<FeedListReadResponse> readList();

    ResponseEntity<FeedReadResponse> read(Long feedId);

    ResponseEntity<FeedDeleteResponse> delete(Long feedId);

    ResponseEntity<?> feedLikes(Long feedId);

    ResponseEntity<FeedUpdateResponse> update(Long feedId, FeedUpdateRequest request, MultipartFile multipartFile);

    ResponseEntity<FeedListReadResponse> readPopularList();


    Page<Feed> searchByTitle(String title, Pageable pageable);
}


