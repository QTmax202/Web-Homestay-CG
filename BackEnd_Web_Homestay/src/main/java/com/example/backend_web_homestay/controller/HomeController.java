package com.example.backend_web_homestay.controller;


import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;

import com.example.backend_web_homestay.service.Homestay.HomestayService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/edit-home")
    public ResponseEntity<Homestay> editHome(@RequestBody Homestay homestayEdit, @PathVariable("id") Long id) {
        Optional<Homestay> homestay = homestayService.findById(id);
        if (!homestay.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        homestayEdit.setId(homestay.get().getId());
        homestayEdit = homestayService.save(homestayEdit);
        return new ResponseEntity<>(homestayEdit, HttpStatus.OK);
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
