package com.example.backend_web_homestay.controller;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.JwtResponse;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.JwtService;
import com.example.backend_web_homestay.service.Role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    IAccountService accountService;

    @Autowired
    IRoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody Account account) {
        if(accountService.existsByGmail(account.getGmail())){
            return new ResponseEntity<>("The username existed!", HttpStatus.OK);
        }
        Account appUser = new Account(account.getGmail(),passwordEncoder.encode(account.getPassword()),account.getRoles());
        accountService.save(appUser);
        return new ResponseEntity<>(appUser, HttpStatus.OK);
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> login(@RequestBody Account account) {
        if(accountService.findByGmail(account.getGmail()).get().getStatus()){
            Authentication authentication = authenticationManager.authenticate
                    (new UsernamePasswordAuthenticationToken(account.getGmail(), account.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.generateTokenLogin(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Account currentUser = accountService.findByGmail(account.getGmail()).get();
            JwtResponse jwtResponse = new JwtResponse(currentUser.getId(), jwt, userDetails.getUsername(), userDetails.getAuthorities());
            return ResponseEntity.ok(jwtResponse);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }
}
