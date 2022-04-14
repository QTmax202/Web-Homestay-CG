package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.MyHomestay;
import com.example.backend_web_homestay.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface IRateRepository extends JpaRepository<Rate, Long> {
    Iterable<Rate> findRatesByHomestay_Id(long id);

    Iterable<Rate> findRatesByAccount_Id(long id);

    @Transactional
    @Modifying
    @Query(value = "select hs.id, hs.name, hs.price, hs.description, hs.address, avg(rate.value_rate) , img.images from homestay hs  \n" +
            "join rate on hs.id = rate.homestay_id \n" +
            "join image_of_homestay img on img.homestay_id = hs.id \n" +
            "where hs.account_id = :id \n" +
            "group by hs.id", nativeQuery = true)
    List<MyHomestay> getHomestayByAccountId(long id);

    @Query("SELECT h.id, h.name, h.price, h.description, h.address, avg(r.value_rate), ioh.images FROM Homestay h " +
            "JOIN Rate r ON r.homestay.id = h.id " +
            "JOIN ImageOfHomestay ioh ON ioh.homestay.id = h.id " +
            "WHERE h.account.id = :id " +
            "GROUP BY h.id")
    List<Object> getAllHome(long id);
}
