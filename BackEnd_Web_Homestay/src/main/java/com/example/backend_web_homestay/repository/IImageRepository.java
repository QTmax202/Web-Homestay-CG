package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.model.ImageOfHomestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<ImageOfHomestay, Long> {

    Iterable<ImageOfHomestay> findImageOfHomestaysByHomestay_Id(long id);

    void deleteImageByHomestayId(long id);
}
