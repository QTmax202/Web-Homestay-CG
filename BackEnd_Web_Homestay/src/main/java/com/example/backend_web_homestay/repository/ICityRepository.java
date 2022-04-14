package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICityRepository extends JpaRepository<City, Long> {
}
