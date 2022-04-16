package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.Role;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.Role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/sign-up")
public class AccountController {
    @Autowired
    private IAccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @GetMapping("/{id}")
    private ResponseEntity<?> getInformationAccount(@PathVariable long id) {
        Optional<Account> account = accountService.findById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PutMapping("/change-pass/{id}")
    public ResponseEntity<?> changePassword(@RequestBody Account account, @PathVariable long id) {
        Optional<Account> accountFind = accountService.findById(id);
        account.setAddress(passwordEncoder.encode(account.getAddress()));
        if (accountFind.get().getPassword().equals(account.getAddress())) {
            account.setId(id);
            account.setAddress(accountFind.get().getAddress());
            account.setAvatar_url(accountFind.get().getAvatar_url());
            account.setDate_birth(accountFind.get().getDate_birth());
            account.setGmail(accountFind.get().getGmail());
            account.setName(accountFind.get().getName());
            account.setPhone_number(accountFind.get().getPhone_number());
            account.setRoles(accountFind.get().getRoles());
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            accountService.save(account);
            return new ResponseEntity<>(account, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    private ResponseEntity<?> createAccount(@RequestBody Account account) {
        if (accountService.existsByGmail(account.getGmail())) {
            return new ResponseEntity<>(true, HttpStatus.BAD_REQUEST);
        } else {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            account.setAvatar_url("https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg");
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(roleService.findById(1L).get());
            account.setRoles(roleSet);
            accountService.save(account);
            return new ResponseEntity<>(account, HttpStatus.OK);
        }
    }

    @GetMapping("/active-account")
    public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
        accountService.activeUser(token);
        return new ResponseEntity<>("Active success!", HttpStatus.OK);
    }
}
