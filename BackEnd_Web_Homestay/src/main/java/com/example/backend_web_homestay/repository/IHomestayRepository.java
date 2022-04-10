package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHomestayRepository extends JpaRepository<Homestay, Long> {
}