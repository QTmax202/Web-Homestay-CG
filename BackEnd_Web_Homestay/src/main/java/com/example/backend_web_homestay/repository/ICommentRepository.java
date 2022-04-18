package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.DTO.RateDTO;
import com.example.backend_web_homestay.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.homestay.id = :id ORDER BY c.time_stamp DESC")
    Iterable<Comment> getCommentsByHomestayId(long id);

    @Query(value = "select c.comment as comment, r.value_rate as id, " +
            "c.time_stamp, c.account_id, c.homestay_id from comment c\n" +
            "join rate r on r.account_id = c.account_id and r.homestay_id = c.homestay_id\n" +
            "where c.homestay_id = :id \n" +
            "group by c.id;", nativeQuery = true)
    Iterable<Comment> getRateAndCommentByHomestay(Long id);

    Boolean existsCommentByAccount_IdAndHomestay_Id(long accountId, long homestayId);
}
