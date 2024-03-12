package com.d111.backend.controller.mongo;

import com.d111.backend.entity.coordi.Coordi;
import com.d111.backend.service.mongo.MongoCoordiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/mongo")
public class MongoCoordiController {

    private final MongoCoordiService mongoCoordiService;

    @Autowired
    public MongoCoordiController(MongoCoordiService mongoCoordiService) {
        this.mongoCoordiService = mongoCoordiService;
    }


    @GetMapping("/{coordiId}")
    public Coordi getCoordiById(@PathVariable String coordiId) {
        return mongoCoordiService.getCoordiById(coordiId);
    }
}
