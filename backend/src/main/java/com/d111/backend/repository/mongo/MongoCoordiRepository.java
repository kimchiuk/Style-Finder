package com.d111.backend.repository.mongo;

import com.d111.backend.entity.coordi.Coordi;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoCoordiRepository extends MongoRepository<Coordi, String> {
}
