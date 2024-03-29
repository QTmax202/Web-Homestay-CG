package com.example.backend_web_homestay.service.Comment;

import com.example.backend_web_homestay.DTO.RateDTO;
import com.example.backend_web_homestay.model.Comment;
import com.example.backend_web_homestay.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private ICommentRepository commentRepository;

    @Override
    public Iterable<Comment> getCommentsByHomestayId(long id) {
        return commentRepository.getCommentsByHomestayId(id);
    }

    @Override
    public Iterable<Comment> getRateAndCommentByHomestay(Long id) {
        return commentRepository.getRateAndCommentByHomestay(id);
    }

    @Override
    public Boolean existsCommentByAccount_IdAndHomestay_Id(long accountId, long homestayId) {
        return commentRepository.existsCommentByAccount_IdAndHomestay_Id(accountId, homestayId);
    }

    @Override
    public Iterable<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentRepository.findById(id);
    }

    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public void remove(Long id) {
        commentRepository.deleteById(id);
    }

}