package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {

    Iterable<Bill> getBillByHomestay_Id(Long id);

    @Query(value = "select * from bill b \n" +
            "join status_homestay s on s.id = b.status_homestay_id\n" +
            "having (s.id != 2 or s.id =  3) and b.homestay_id = ?;"
            , nativeQuery = true)
    List<Bill> findAllBillByHomestay_Status(Long id);
}
