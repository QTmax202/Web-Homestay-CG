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

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.List;

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

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(@RequestBody Account account) {
        if (accountService.existsByGmail(account.getGmail())){
            if (!accountService.findByGmail(account.getGmail()).get().getStatus()) {
                return new ResponseEntity<>("unverified account", HttpStatus.OK);
            }
        }
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(account.getGmail(), account.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateTokenLogin(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Account currentUser = accountService.findByGmail(account.getGmail()).get();
        JwtResponse jwtResponse = new JwtResponse(currentUser.getId(), jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return ResponseEntity.ok(jwtResponse);
    }

}
