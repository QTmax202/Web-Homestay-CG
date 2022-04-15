package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {
    @Query(value = "select b.id as id, b.end_date as endDate, b.registration_date as regisDate, b.start_date as startDate, " +
            "b.homestay_id as homeId, b.status_homestay_id as statusHomeId, b.price as Price, h.name as homestayName, " +
            "a.name as accountName, avg(rate.value_rate) as avgRate, round(avg(rate.value_rate)) as roundRate from bill b\n" +
            "join homestay h on h.id = b.homestay_id\n" +
            "join rate on rate.homestay_id = h.id\n" +
            "join account a on b.account_id = a.id\n" +
            "where h.account_id = 2\n" +
            "group by b.id;", nativeQuery = true)
    Iterable<YourBillDTO> getYourBillByAccountId(long id);

    @Query(value = "select b.id as id, b.end_date as endDate, b.registration_date as regisDate, b.start_date as startDate, " +
            "b.homestay_id as homeId, b.status_homestay_id as statusHomeId, b.price as Price, h.name as homestayName, " +
            "a.name as accountName, avg(rate.value_rate) as avgRate, round(avg(rate.value_rate)) as roundRate from bill b\n" +
            "join homestay h on h.id = b.homestay_id\n" +
            "join rate on rate.homestay_id = h.id\n" +
            "join account a on b.account_id = a.id\n" +
            "where a.id = 2\n" +
            "group by b.id;", nativeQuery = true)
    Iterable<MyBillDTO> getMyBillByAccountId(long id);

    Iterable<Bill> getBillByHomestay_Id(Long id);

    @Query(value = "select * from bill b \n" +
            "join status_homestay s on s.id = b.status_homestay_id\n" +
            "having (s.id != 2 or s.id =  3) and b.homestay_id = ?;"
            , nativeQuery = true)
    List<Bill> findAllBillByHomestay_Status(Long id);
}
