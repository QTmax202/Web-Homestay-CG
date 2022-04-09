package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {
}
