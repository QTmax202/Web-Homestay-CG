package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.service.Homestay.HomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/homestay")
public class HomeController {
    @Autowired
    private HomestayService homestayService;


}
