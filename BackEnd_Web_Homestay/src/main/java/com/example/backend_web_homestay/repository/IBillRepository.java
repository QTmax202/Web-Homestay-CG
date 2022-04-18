package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.TurnOverDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {
    @Query(value = "select b.id as id, b.end_date as endDate, b.registration_date as regisDate, b.start_date as startDate,\n" +
            "            b.homestay_id as homeId, b.status_homestay_id as statusHomeId, b.price as Price, h.name as homestayName,\n" +
            "            a.name as accountName, avg(rate.value_rate) as avgRate, round(avg(rate.value_rate)) as roundRate from bill b\n" +
            "            join homestay h on h.id = b.homestay_id\n" +
            "            left join rate on rate.homestay_id = h.id\n" +
            "            join account a on b.account_id = a.id\n" +
            "            where h.account_id = ?\n" +
            "            group by b.id", nativeQuery = true)
    Iterable<YourBillDTO> getYourBillByAccountId(long id);

    @Query(value = "select b.id as id, b.end_date as endDate, b.registration_date as regisDate, b.start_date as startDate,\n" +
            "            b.homestay_id as homeId, b.status_homestay_id as statusHomeId, b.price as Price, h.name as homestayName,\n" +
            "            a.name as accountName, avg(rate.value_rate) as avgRate, round(avg(rate.value_rate)) as roundRate from bill b\n" +
            "            join homestay h on h.id = b.homestay_id\n" +
            "            left join rate on rate.homestay_id = h.id\n" +
            "            join account a on b.account_id = a.id\n" +
            "            where b.account_id = ?\n" +
            "            group by b.id", nativeQuery = true)
    Iterable<MyBillDTO> getMyBillByAccountId(long id);

    Iterable<Bill> getBillByHomestay_Id(Long id);

    @Query(value = "select * from bill b \n" +
            "join status_homestay s on s.id = b.status_homestay_id\n" +
            "having (s.id = 2 or s.id =  3) and b.homestay_id = ?;"
            , nativeQuery = true)
    Iterable<Bill> findAllBillByHomestay_Status(Long id);

    @Query(value = "select hs.id as id, hs.name as name, sum(b.price) as sumPrice, count(b.price) as countPrice from homestay hs\n" +
            "join bill b on b.homestay_id = hs.id\n" +
            "where hs.account_id = :id and b.start_date between :startDate1 and :startDate2\n" +
            "group by hs.id;", nativeQuery = true)
    Iterable<TurnOverDTO> findTurnOverByAccountAndStartDate(Long id, String startDate1, String startDate2);
}
