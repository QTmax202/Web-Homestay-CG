package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.*;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.HomeStay.IHomestayService;
import com.example.backend_web_homestay.service.Image.IImageService;
import com.example.backend_web_homestay.service.Rate.IRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/homestay")
@CrossOrigin("*")
public class HomestayController {
    @Autowired
    private IHomestayService homestayService;

    @Autowired
    private IImageService iImageService;

    @Autowired
    private IRateService rateService;
    @Autowired
    private IAccountService accountService;

    @GetMapping
    private ResponseEntity<?> getAll() {
        Iterable<Homestay> homestays = homestayService.findAll();
        if (!homestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    // get homestay tru chu nha
    @GetMapping("/acc/{id}")
    private ResponseEntity<?> getAllHomestay(@PathVariable long id) {
        Iterable<Homestay> homestays = homestayService.findAllHomeStay(id);
        if (!homestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getHomestayById(@PathVariable long id) {
        Optional<Homestay> homestay = homestayService.findById(id);
        if (!homestay.isPresent()) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(homestay, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    private ResponseEntity<?> getHomestayByAccountId(@PathVariable long id) {
        List<MyHomestayDTO> homestays = homestayService.getHomestayByAccountId(id);
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    // image

    @GetMapping("/image-of-homestay")
    private ResponseEntity<?> findImageOfHomestays() {
        Iterable<ImageOfHomestay> imageOfHomestays = iImageService.findAll();
        if (!imageOfHomestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imageOfHomestays, HttpStatus.OK);
    }

    @GetMapping("/image-of-homestay/{id}")
    private ResponseEntity<?> findImageOfHomestaysByHomestay_Id(@PathVariable long id) {
        Iterable<ImageOfHomestay> imageOfHomestays = iImageService.findImageOfHomestaysByHomestay_Id(id);
        if (!imageOfHomestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imageOfHomestays, HttpStatus.OK);
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
    @PostMapping("/save-image")
    public ResponseEntity<?> saveImage(@RequestBody ImageOfHomestay image){
        return new ResponseEntity<>(iImageService.save(image), HttpStatus.CREATED);
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
        Iterable<HomestayType> homestayTypes = homestayService.findAllTypes();
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

