package com.example.backend_web_homestay.controller;


import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;

import com.example.backend_web_homestay.model.ImageOfHomestay;
import com.example.backend_web_homestay.service.Homestay.HomestayService;
import com.example.backend_web_homestay.service.Image.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("api/homestay")
public class HomeController {
    @Autowired
    private HomestayService homestayService;

    @Autowired
    private IImageService iImageService;


    @GetMapping("/list")
    public ResponseEntity<Iterable<Homestay>> getAll() {
        Iterable<Homestay> homestays = homestayService.getAllHomestays();
        if (!homestays.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/type-home")
    public ResponseEntity<Iterable<HomestayType>> getAllType() {
        Iterable<HomestayType> homestayTypes = homestayService.findAllTypes();
        if (!homestayTypes.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homestayTypes, HttpStatus.OK);
    }

    @GetMapping("/city")
    public ResponseEntity<Iterable<City>> getAllCity() {
        Iterable<City> city = homestayService.findAllCity();
        if (!city.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Homestay> createHome(@RequestBody Homestay homestay) {
        homestay.setAccount(homestay.getAccount());
        Homestay homestayCreate = homestayService.save(homestay);
        return new ResponseEntity<>(homestayCreate, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Homestay> editHome(@RequestBody Homestay homestayEdit, @PathVariable Long id) {
        Optional<Homestay> homestay = homestayService.findById(id);
        return homestay.map(home -> {
            home.setId(home.getId());
            home.setName(home.getName());
            home.setAddress(home.getAddress());
            home.setBed_room(home.getBed_room());
            home.setBath_room(home.getBath_room());
            home.setPrice(home.getPrice());
            home.setHomestay_type(home.getHomestay_type());
            home.setCity(home.getCity());
            Iterable<ImageOfHomestay> image = iImageService.findImageOfHomestaysByHomestay_Id(id);
            for (ImageOfHomestay images: image) {
                iImageService.remove(images.getId());
            }
            if (home.getImageOfHomestays() != null) {
                for (ImageOfHomestay image1: home.getImageOfHomestays()) {
                    image1.setHomestay(homestayEdit);
                    iImageService.save(image1);
                }
            }
            return new ResponseEntity<>(homestayService.save(home), HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Homestay> deleteHome(@PathVariable Long id) {
        Optional<Homestay> homestayRemove = homestayService.findById(id);
        return homestayRemove.map(house1 -> {
            homestayService.delete(id);
            return new ResponseEntity<>(house1, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
