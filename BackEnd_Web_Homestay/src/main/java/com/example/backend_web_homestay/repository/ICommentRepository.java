package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.homestay.id = :id ORDER BY c.time_stamp DESC")
    Iterable<Comment> getCommentsByHomestayId(long id);


}