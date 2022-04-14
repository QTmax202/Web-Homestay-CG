package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRateRepository extends JpaRepository<Rate, Long> {
    Iterable<Rate> findRatesByHomestay_Id(long id);

    Iterable<Rate> findRatesByAccount_Id(long id);



//    @Query("SELECT h.id, h.name, h.price, h.description, h.address, avg(r.value_rate), ioh.images FROM Homestay h " +
//            "JOIN Rate r ON r.homestay.id = h.id " +
//            "JOIN ImageOfHomestay ioh ON ioh.homestay.id = h.id " +
//            "WHERE h.account.id = :id " +
//            "GROUP BY h.id")
//    List<Object> getAllHome(long id);
}
