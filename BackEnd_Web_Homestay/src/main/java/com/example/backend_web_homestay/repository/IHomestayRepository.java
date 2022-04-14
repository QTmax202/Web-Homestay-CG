package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IHomestayRepository extends JpaRepository<Homestay, Long> {

    @Query(value = "select * from homestay hs where hs.account_id != :id and hs.status = true", nativeQuery = true)
    Iterable<Homestay> findAllHomeStay(long id);
}
