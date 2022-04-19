package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Notify;
import com.example.backend_web_homestay.repository.INotifyRepository;
import com.example.backend_web_homestay.service.Notify.INotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notify")
@CrossOrigin("*")
public class NotifyController {
    @Autowired
    private INotifyRepository notifyRepository;

    @Autowired
    private INotifyService notifyService;

    @GetMapping("/account/{id}")
    private ResponseEntity<?> getNotifyByAccountDesc(@PathVariable long id) {
        Iterable<Notify> notifies = notifyService.getNotifyByAccountDesc(id);
        if (!notifies.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
