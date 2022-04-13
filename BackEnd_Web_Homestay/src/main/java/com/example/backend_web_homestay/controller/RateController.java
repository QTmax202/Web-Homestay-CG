package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Rate;
import com.example.backend_web_homestay.service.Rate.IRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rate")
@CrossOrigin("*")
public class RateController {
    @Autowired
    private IRateService rateService;

    @GetMapping("/homestay/{id}")
    public ResponseEntity<?> getRateByHomestay(@PathVariable long id) {
        Iterable<Rate> rates = rateService.getRateByHomestay(id);
        if (!rates.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rates, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<?> getRateByAccount(@PathVariable long id) {
        Iterable<Rate> rates = rateService.getRateByAccount(id);
        if (!rates.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rates, HttpStatus.OK);
    }
}
