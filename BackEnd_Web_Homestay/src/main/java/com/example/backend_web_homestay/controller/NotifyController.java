package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Notify;
import com.example.backend_web_homestay.repository.INotifyRepository;
import com.example.backend_web_homestay.service.Notify.INotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
        return new ResponseEntity<>(notifies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> editNotify(@PathVariable long id) {
        Optional<Notify> notifyEdit = notifyService.findById(id);
        notifyEdit.get().setStatus(true);
        notifyService.save(notifyEdit.get());
        return new ResponseEntity<>(notifyEdit, HttpStatus.OK);
    }

    @GetMapping("/check/{id}")
    private ResponseEntity<?> check1NotifyByAccountDesc(@PathVariable long id) {
        Iterable<Notify> notifies = notifyService.check1NotifyByAccount(id);
        if (!notifies.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notifies, HttpStatus.OK);
    }
}
