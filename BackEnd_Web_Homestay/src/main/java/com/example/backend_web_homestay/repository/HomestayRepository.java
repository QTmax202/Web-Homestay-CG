package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayRepository extends JpaRepository<Homestay, Long> {
    @Query(value = "select * from homestay as h order by h.id desc limit 1", nativeQuery = true)
    Homestay findHomestayLast();
}
