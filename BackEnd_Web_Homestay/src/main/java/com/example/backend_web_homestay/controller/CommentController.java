package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.DTO.RateDTO;
import com.example.backend_web_homestay.model.Comment;
import com.example.backend_web_homestay.model.Rate;
import com.example.backend_web_homestay.service.Comment.ICommentService;
import com.example.backend_web_homestay.service.Rate.IRateService;
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

    @Autowired
    private IRateService rateService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentsByHomestayId(@PathVariable long id) {
        Iterable<Comment> rateDTOS = commentService.getRateAndCommentByHomestay(id);
        if (!rateDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rateDTOS, HttpStatus.OK);
    }

    @GetMapping("/{accId}/{homeId}")
    public ResponseEntity<?> existsCommentByAccount_IdAndHomestay_Id(@PathVariable("accId") long accId,
                                                                     @PathVariable("homeId") long homeId) {
        if (commentService.existsCommentByAccount_IdAndHomestay_Id(accId, homeId)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        Comment comment1 = commentService.save(comment);
        return new ResponseEntity<>(comment1, HttpStatus.OK);
    }

    @PostMapping("/rate")
    public ResponseEntity<?> createRate(@RequestBody Rate rate) {
        Rate rate1 = rateService.save(rate);
        return new ResponseEntity<>(rate1, HttpStatus.OK);
    }


}
