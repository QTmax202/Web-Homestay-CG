package com.example.backend_web_homestay.service.Account;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IAccountService extends IGeneralService<Account>, UserDetailsService {
    Optional<Account> findByGmail(String username);

    Boolean existsByGmail(String username);

    Optional<Account> findAccountByGmailAndPassword(String username,String password);
}