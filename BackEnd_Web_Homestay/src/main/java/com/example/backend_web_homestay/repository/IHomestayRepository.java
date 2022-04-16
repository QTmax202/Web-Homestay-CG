package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface IHomestayRepository extends JpaRepository<Homestay, Long> {

    @Query(value = "select * from homestay hs where hs.account_id != :id and hs.status = true", nativeQuery = true)
    Iterable<Homestay> findAllHomeStay(long id);

    @Transactional
    @Modifying
    @Query(value = "select hs.id as id, hs.name as name, hs.price as price, hs.description as description, hs.address as address, avg(rate.value_rate) as avgRate, round(avg(rate.value_rate)) as roundRate, img.images as images from homestay hs  \n" +
            "join rate on hs.id = rate.homestay_id \n" +
            "join image_of_homestay img on img.homestay_id = hs.id \n" +
            "where hs.account_id = :id \n" +
            "group by hs.id", nativeQuery = true)
    List<MyHomestayDTO> getHomestayByAccountId(long id);

    @Query(value = "select * from homestay\n" +
            "where name like %:name% and city_id = :idCity and status = 1 and price between :price1 and :price2", nativeQuery = true)
    Iterable<Homestay> findHomestayByNameAndCityAndPrice(String name, Long idCity, Long price1, Long price2);
}
