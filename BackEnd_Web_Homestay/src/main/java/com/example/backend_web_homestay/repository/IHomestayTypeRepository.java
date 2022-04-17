package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.HomestayType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHomestayTypeRepository extends JpaRepository<HomestayType, Long> {
    HomestayType findByName(String name);
}
