package com.d111.backend.service.mongo;

import com.d111.backend.entity.coordi.Coordi;

public interface MongoCoordiService {

    Coordi getCoordiById(String coordiId);
}
