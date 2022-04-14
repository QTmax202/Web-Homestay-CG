package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRateRepository extends JpaRepository<Rate, Long> {
    Iterable<Rate> findRatesByHomestay_Id(long id);

    Iterable<Rate> findRatesByAccount_Id(long id);

    @Query(value = "select hs.id, hs.name, hs.price, hs.description, hs.address, avg(rate.value_rate) , img.images from homestay hs  \n" +
            "join rate on hs.id = rate.homestay_id \n" +
            "join image_of_homestay img on img.homestay_id = hs.id \n" +
            "where hs.account_id = :id \n" +
            "group by hs.id", nativeQuery = true)
    List<Object> getHomestayByAccountId(long id);

}
