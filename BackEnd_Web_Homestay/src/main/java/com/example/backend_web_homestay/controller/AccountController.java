package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.DTO.ChangePasswordDTO;
import com.example.backend_web_homestay.DTO.ProfileDTO;
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

    @PutMapping("{id}")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long id, @RequestBody ChangePasswordDTO changePassword) {
        Account account = new Account();
        if (accountService.findById(id).isPresent()){
            account = accountService.findById(id).get();
        }
        if (!passwordEncoder.matches(changePassword.getCurrentPassword(), account.getPassword())) {
//            Mã 600 là lỗi sai mật khẩu hiện tại
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else if (!changePassword.getNewPassword().equals(changePassword.getConfirmPassword())) {
//            Mã 601 là lỗi xác nhận mật khẩu mới sai
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        account.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        accountService.save(account);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update-profile/{id}")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO,
                                           @PathVariable long id) {
        Optional<Account> account = accountService.findById(id);
        account.get().setName(profileDTO.getName());
        account.get().setGmail(profileDTO.getGmail());
        account.get().setPhone_number(profileDTO.getPhone_number());
        account.get().setAddress(profileDTO.getAddress());
        accountService.update(account.get());
        return new ResponseEntity<>(account.get(), HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<?> createAccount(@RequestBody Account account) {
        if (accountService.existsByGmail(account.getGmail())) {
            return new ResponseEntity<>(true ,HttpStatus.BAD_REQUEST);
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
