package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.service.City.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cites")
public class CityController {
    @Autowired
    private ICityService cityService;
    @GetMapping()
    public ResponseEntity<Iterable<City>> findAllCity() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> findCityById(@PathVariable Long id) {
        return new ResponseEntity<>(cityService.findById(id).get(), HttpStatus.OK);
    }

}

