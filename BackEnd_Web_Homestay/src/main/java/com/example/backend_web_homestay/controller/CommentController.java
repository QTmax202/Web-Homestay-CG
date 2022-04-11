package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Comment;
import com.example.backend_web_homestay.service.Comment.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private ICommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentsByHomestayId(@PathVariable long id) {
        Iterable<Comment> comments = commentService.getCommentsByHomestayId(id);
        if (!comments.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}
