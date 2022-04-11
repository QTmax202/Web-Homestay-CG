package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.repository.HomestayRepository;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.Homestay.HomestayService;
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

//    @Autowired
//    private IAccountService accountService;
//
//    @Autowired
//    private HomestayRepository homestayRepository;

    @GetMapping("/list")
    public ResponseEntity<Iterable<Homestay>> showAll() {
        Iterable<Homestay> homestays = homestayService.getAllHomestays();
        if (!homestays.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/type-home")
    public ResponseEntity<Iterable<HomestayType>> showAllType() {
        Iterable<HomestayType> homestayTypes = homestayService.findAllTypes();
        if (!homestayTypes.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(homestayTypes, HttpStatus.OK);
    }

    @GetMapping("/city")
    public ResponseEntity<Iterable<City>> showAllCity() {
        Iterable<City> city = homestayService.findAllCity();
        if (!city.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Homestay> createHome(@RequestPart("homestay") Homestay homestay) {
        homestay.setAccount(homestay.getAccount());
        homestayService.save(homestay);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
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

}
