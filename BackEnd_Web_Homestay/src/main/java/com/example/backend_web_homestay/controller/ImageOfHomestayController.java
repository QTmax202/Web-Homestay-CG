package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.ImageOfHomestay;
import com.example.backend_web_homestay.repository.IImageRepository;
import com.example.backend_web_homestay.service.Image.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/image")
@CrossOrigin("*")
public class ImageOfHomestayController {

    @Autowired
    private IImageRepository imageRepository;

    @Autowired
    private IImageService imageService;

    @PostMapping("/save-image")
    private ResponseEntity<?> getYourBillByAccountId(@RequestBody ImageOfHomestay image) {
        ImageOfHomestay imageOfHomestay = imageService.save(image);
        return new ResponseEntity<>(imageOfHomestay, HttpStatus.OK);
    }

    @GetMapping("/images-of-homestay/{id}")
    private  ResponseEntity<?> getImageOfHomestays(@PathVariable long id){
        Iterable<ImageOfHomestay> images = imageService.findImageOfHomestaysByHomestay_Id(id);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    @DeleteMapping("/delete-image-homestay/{id}")
    private  ResponseEntity<?> deleteImageOfHomestays(@PathVariable Long id){
        Optional<ImageOfHomestay> image = imageService.findById(id);
        if (image.isPresent()){
            imageRepository.deleteById(id);
            return new ResponseEntity<>(image, HttpStatus.OK);
        }
        return new ResponseEntity<>(image, HttpStatus.NO_CONTENT);
    }
}
