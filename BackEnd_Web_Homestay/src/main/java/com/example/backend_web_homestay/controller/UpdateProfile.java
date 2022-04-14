package com.example.backend_web_homestay.controller;
import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.service.Account.AccountService;
import com.example.backend_web_homestay.service.Role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/profile")
public class UpdateProfile {

    @Autowired
    private AccountService accountService;

    @Autowired
    private IRoleService roleService;

    @GetMapping("/{id}")
    private ResponseEntity<?> getAccountById(@PathVariable long id) {
        Optional<Account> account = accountService.findById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
    
    @PostMapping
    private ResponseEntity<?> getAllAccount() {
        Iterable<Account> accounts = accountService.findAll();
        if (!accounts.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Account> updateAccount(@RequestBody Account account, @PathVariable long id) {
        Optional<Account> accountOptional = accountService.findById(id);
        if (accountOptional.isPresent()) {
            account.setPassword(accountOptional.get().getPassword());
            account.setId(accountOptional.get().getId());
            account.setStatus(accountOptional.get().getStatus());
            accountService.saveProfile(account);
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


//        return accountOptional.map(account1 -> {
//            account1.setId(account1.getId());
//            account1.setAvatar_url(account.getAvatar_url());
//            account1.setPhone_number(account.getPhone_number());
//            account1.setName(account.getName());
//            account1.setPassword(account1.getPassword());
//            account1.setDate_birth(account.getDate_birth());
//            account1.setAddress(account.getAddress());
//            accountService.save(account1);
//            return new ResponseEntity<>(account, HttpStatus.OK);
//        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
