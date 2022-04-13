package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.Role;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.Role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
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

    @PostMapping
    private ResponseEntity<?> createAccount(@RequestBody Account account) {
        if (accountService.existsByGmail(account.getGmail())) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            account.setAvatar_url("https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg");
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(roleService.findById(1L).get());
            account.setRoles(roleSet);
            accountService.save(account);
            return new ResponseEntity<>("We have sent an email. Please check email to active account!", HttpStatus.OK);

        }
    }

    @GetMapping("/active-account")
    public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
        accountService.activeUser(token);
        return new ResponseEntity<>("Active success!", HttpStatus.OK);
    }
}