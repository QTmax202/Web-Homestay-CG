package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.ImageOfHomestay;
import com.example.backend_web_homestay.service.HomeStay.IHomestayService;
import com.example.backend_web_homestay.service.Image.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/homestay")
@CrossOrigin("*")
public class HomestayController {
    @Autowired
    private IHomestayService homestayService;

    @Autowired
    private IImageService iImageService;

    @GetMapping
    private ResponseEntity<?> getAllHomestay() {
        Iterable<Homestay> homestays = homestayService.findAll();
        if (!homestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getHomestayById(@PathVariable long id) {
        Optional<Homestay> homestay = homestayService.findById(id);
        Iterable<ImageOfHomestay> imageOfHomestays = iImageService.findImageOfHomestaysByHomestay_Id(id);
        if (!homestay.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homestay, HttpStatus.OK);
    }

    @GetMapping("/image-of-homestay/{id}")
    private ResponseEntity<?> findImageOfHomestaysByHomestay_Id(@PathVariable long id) {
        Iterable<ImageOfHomestay> imageOfHomestays = iImageService.findImageOfHomestaysByHomestay_Id(id);
        if (!imageOfHomestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imageOfHomestays, HttpStatus.OK);
    }
}

