package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INotifyRepository extends JpaRepository<Notify, Long> {
}
