package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.repository.INotifyRepository;
import com.example.backend_web_homestay.service.Notify.INotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin("*")
public class NotifyController {
    @Autowired
    private INotifyRepository notifyRepository;

    @Autowired
    private INotifyService notifyService;
}
