package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface INotifyRepository extends JpaRepository<Notify, Long> {
    @Query(value = "select * from notify n \n" +
            "where n.account_id = :id \n" +
            "order by n.id desc;", nativeQuery = true)
    Iterable<Notify> getNotifyByAccountDesc(Long id);
}
