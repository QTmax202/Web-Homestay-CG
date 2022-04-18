package com.example.backend_web_homestay.controller;


import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.repository.IBillRepository;
import com.example.backend_web_homestay.service.Bill.IBillService;
import com.example.backend_web_homestay.service.StatusHomestay.IStatusHomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private IBillRepository billRepository;

    @Autowired
    private IStatusHomestayService statusHomestayService;

    @Autowired
    private IBillService billService;

    @GetMapping("/account/{id}")
    private ResponseEntity<?> getYourBillByAccountId(@PathVariable long id) {
        Iterable<YourBillDTO> yourBillDTOS = billService.getYourBillByAccountId(id);
        return new ResponseEntity<>(yourBillDTOS, HttpStatus.OK);
    }

    @GetMapping("/account-my-bill/{id}")
    private ResponseEntity<?> getMyBillByAccountId(@PathVariable long id) {
        Iterable<MyBillDTO> myBillDTOS = billService.getMyBillByAccountId(id);
        return new ResponseEntity<>(myBillDTOS, HttpStatus.OK);
    }

    @PostMapping("/create-bill")
    private ResponseEntity<?> createBill(@RequestBody Bill bill){
        bill.setRegistration_date(LocalDate.now());
        bill.setStatus_homestay(statusHomestayService.findById(1L).get());
        Bill bill1 = billService.save(bill);
        return new ResponseEntity<>(bill1, HttpStatus.OK);
    }

    @GetMapping("/bill-homestay/{id}")
    private ResponseEntity<?> getBillHomestay(@PathVariable long id){
        Iterable<Bill> billHomestay = billService.findBillByHomeStayId(id);
        return new ResponseEntity<>(billHomestay, HttpStatus.OK);
    }

    @GetMapping("/bill-homestay-status/{id}")
    private ResponseEntity<?> getBillHomestayStatus(@PathVariable long id){
        Iterable<Bill> bills = billRepository.findAllBillByHomestay_Status(id);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @PostMapping("/cancelling-invoice/{id}")
    private ResponseEntity<?> cancellingInvoice(@PathVariable long id){
        Optional<Bill> bill = billService.findById(id);
        if (LocalDate.now().isBefore(bill.get().getStart_date())){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(5L).get());
//            Bill bill_edit = billService.save(bill.get());
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/homestay-check-in/{id}")
    private ResponseEntity<?> HomestayCheckIn(@PathVariable long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(3L).get());
//            Bill bill_edit = billService.save(bill.get());
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/homestay-check-out/{id}")
    private ResponseEntity<?> homestayCheckOut(@PathVariable long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(4L).get());
            Bill bill_edit = billService.save(bill.get());
            return new ResponseEntity<>(bill_edit, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @GetMapping("/find-bill/{id}")
    private ResponseEntity<?> getFindBill(@PathVariable long id){
        Optional<Bill> bill = billService.findById(id);
        return new ResponseEntity<>(bill, HttpStatus.OK);
    }
}
