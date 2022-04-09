package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.HomestayType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayTypeRepository extends CrudRepository<HomestayType, Long> {
}
