package com.d111.backend.service.closet;

import com.d111.backend.dto.closet.response.ClosetListReadResponseDTO;
import com.d111.backend.dto.closet.response.ClosetUploadResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ClosetService {

    ResponseEntity<ClosetUploadResponseDTO> uploadCloset(String part, MultipartFile clothImage) throws Exception;

    ResponseEntity<List<ClosetListReadResponseDTO>> getClosets();

    ResponseEntity<String> deleteCloset(Long closetId);

}
