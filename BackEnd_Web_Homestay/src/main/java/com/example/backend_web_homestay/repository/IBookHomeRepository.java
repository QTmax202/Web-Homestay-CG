package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookHomeRepository extends JpaRepository<Bill, Long> {
}
