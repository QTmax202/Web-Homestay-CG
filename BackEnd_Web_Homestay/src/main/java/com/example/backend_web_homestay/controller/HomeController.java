package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.*;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.HomeStay.HomestayService;
import com.example.backend_web_homestay.service.HomeStay.IHomestayService;
import com.example.backend_web_homestay.service.Image.IImageService;
import com.example.backend_web_homestay.service.Rate.IRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/homestay")
@CrossOrigin("*")
public class HomeController {
    @Autowired
    private IHomestayService homestayService;

    @Autowired
    private IImageService iImageService;

    @Autowired
    private IAccountService accountService;
    @PostMapping("/add")
    public ResponseEntity<?> createHouse(@RequestBody Homestay homestay) {
       homestayService.save(homestay);
        if (homestay.getImageOfHomestays() != null) {
            for (ImageOfHomestay image : homestay.getImageOfHomestays()) {
                image.setHomestay(homestay);
                iImageService.save(image);
            }
        }
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
    //tao nha
    @PostMapping("/create/{account_id}")
    public ResponseEntity<Homestay> createHome(@RequestBody Homestay homestay,
                                               @PathVariable("account_id") long id) {
        Optional<Account> account = accountService.findById(id);
        if (!account.isPresent()) {
            throw new RuntimeException("User doesn't exist");
        }
        homestay.setAccount(account.get());
        homestayService.save(homestay);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    // them anh nha
    @PostMapping("/image")
    public ResponseEntity<?> saveImage(@RequestBody ImageOfHomestay image){
        iImageService.save(image);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    //Sua thong tin nha
    @PutMapping("/{id}")
    public ResponseEntity<?> editHome(@RequestBody Homestay homestayEdit, @PathVariable Long id) {
        Optional<Homestay> homestay = homestayService.findById(id);
        if (!homestay.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        homestayEdit.setId(homestay.get().getId());
        homestayEdit.setName(homestay.get().getName());
        homestayEdit.setAddress(homestay.get().getAddress());
        homestayEdit.setBed_room(homestay.get().getBed_room());
        homestayEdit.setBath_room(homestay.get().getBath_room());
        homestayEdit.setPrice(homestay.get().getPrice());
        homestayEdit.setStatus(homestay.get().getStatus());
        homestayEdit.setDescription(homestay.get().getDescription());
        homestayEdit.setHomestay_type(homestay.get().getHomestay_type());
        homestayEdit.setCity(homestay.get().getCity());
        homestayEdit = homestayService.save(homestayEdit);
        return new ResponseEntity<>(homestayEdit, HttpStatus.OK);
    }
    @GetMapping("/type-home")
    public ResponseEntity<?> getAllType() {
        Iterable<HomestayType> homestayTypes = homestayService.findAllType();
        if (!homestayTypes.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homestayTypes, HttpStatus.OK);
    }

    @GetMapping("/city")
    public ResponseEntity<?> getAllCity() {
        Iterable<City> city = homestayService.findAllCity();
        if (!city.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

}
