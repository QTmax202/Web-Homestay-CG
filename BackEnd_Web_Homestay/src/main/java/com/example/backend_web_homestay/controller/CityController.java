package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.DTO.CityDTO;
import com.example.backend_web_homestay.service.City.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/city")
@CrossOrigin("*")
public class CityController {

    @Autowired
    private ICityService cityService;

    @GetMapping("/top-1")
    public ResponseEntity<?> getCityTop1() {
        Iterable<CityDTO> cityDTOS = cityService.getCityTop1();
        if (!cityDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cityDTOS, HttpStatus.OK);
    }

    @GetMapping("/top-2")
    public ResponseEntity<?> getCityTop2() {
        Iterable<CityDTO> cityDTOS = cityService.getCityTop2();
        if (!cityDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cityDTOS, HttpStatus.OK);
    }

    @GetMapping("/top-3")
    public ResponseEntity<?> getCityTop3() {
        Iterable<CityDTO> cityDTOS = cityService.getCityTop3();
        if (!cityDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cityDTOS, HttpStatus.OK);
    }
}
