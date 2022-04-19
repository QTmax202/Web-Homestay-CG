package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.ImageOfHomestay;
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

    @GetMapping("/my-homestay/{id}")
    private ResponseEntity<?> getAllMyHomestayRate(@PathVariable long id) {
        List<MyHomestayDTO> homestays = homestayService.getAllMyHomestayRate(id);
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/your-homestay/{id}")
    private ResponseEntity<?> getAllYourHomestayRate(@PathVariable long id) {
        List<MyHomestayDTO> homestays = homestayService.getAllYourHomestayRate(id);
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/their-homestay")
    private ResponseEntity<?> getAllHomestayRate() {
        List<MyHomestayDTO> homestays = homestayService.getAllHomestayRate();
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

    @PostMapping
    private ResponseEntity<?> createHomestay(@RequestBody Homestay homestay) {
        return new ResponseEntity<>(homestayService.save(homestay), HttpStatus.OK);
    }

    // find homestay
    @GetMapping("/search")
    private ResponseEntity<?> findHomestayByNameAndCityAndPrice(@RequestParam(required = false) String name,
                                                                @RequestParam(required = false) Long idCity,
                                                                @RequestParam(required = false) Long price1,
                                                                @RequestParam(required = false) Long price2) {
        if (price1 == null) price1 = 0L;
        if (price2 == null) price2 = 999999999L;
        Iterable<Homestay> homestays = homestayService.findHomestayByNameAndCityAndPrice(name, idCity, price1, price2);
        if (!homestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    @GetMapping("/{id}/search")
    private ResponseEntity<?> findHomestayByNameAndCityAndPriceSignIn(@PathVariable Long id,
                                                                      @RequestParam(required = false) String name,
                                                                      @RequestParam(required = false) Long idCity,
                                                                      @RequestParam(required = false) Long price1,
                                                                      @RequestParam(required = false) Long price2) {
        if (price1 == null) price1 = 0L;
        if (price2 == null) price2 = 999999999L;
        Iterable<Homestay> homestays = homestayService.findHomestayByNameAndCityAndPriceSignIn(id, name, idCity, price1, price2);
        if (!homestays.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(homestays, HttpStatus.OK);
    }

    // top 5 homestay
    @GetMapping("/top-5")
    public ResponseEntity<?> getTop5Homestay() {
        Iterable<MyHomestayDTO> myHomestayDTOS = homestayService.getTop5Homestay();
        return new ResponseEntity<>(myHomestayDTOS, HttpStatus.OK);
    }
}

