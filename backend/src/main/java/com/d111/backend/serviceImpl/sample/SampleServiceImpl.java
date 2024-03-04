package com.d111.backend.serviceImpl.sample;

import com.d111.backend.dto.sample.response.SampleTestResponse;
import com.d111.backend.entity.sample.Sample;
import com.d111.backend.repository.sample.SampleRepository;
import com.d111.backend.service.sample.SampleService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SampleServiceImpl implements SampleService {

    SampleRepository sampleRepository;

    @Override
    public ResponseEntity<String> createSample() {
        Sample sample = Sample.builder().sampleColumn("Good?").build();

        return ResponseEntity.status(HttpStatus.CREATED).body("Good");
    }

    @Override
    public ResponseEntity<List<SampleTestResponse>> getSamples() {
        List<Sample> samples = sampleRepository.findAll();

        List<SampleTestResponse> sampleTestResponses = new ArrayList<>();

        for (Sample sample: samples) {
            sampleTestResponses.add(SampleTestResponse.builder().sampleColumn(sample.getSampleColumn()).build());
        }

        return ResponseEntity.status(HttpStatus.OK).body(sampleTestResponses);
    }
}
