package com.d111.backend.controller.sample;

import com.d111.backend.dto.sample.response.SampleTestResponse;
import com.d111.backend.service.sample.SampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sample")
public class SampleController {

    private final SampleService sampleService;

    @GetMapping("/getAll")
    ResponseEntity<List<SampleTestResponse>> getSamples() {
        return sampleService.getSamples();
    }

    @GetMapping("/create")
    ResponseEntity<String> createSample() {
        return sampleService.createSample();
    }

}
