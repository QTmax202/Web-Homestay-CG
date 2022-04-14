package com.example.backend_web_homestay.service.Account;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IAccountService extends IGeneralService<Account>, UserDetailsService {
    Optional<Account> findByGmail(String username);

    Boolean existsByGmail(String username);

    Account saveProfile(Account account);

    Optional<Account> findAccountByGmailAndPassword(String username,String password);

    Optional<Account> findUserByEmail(String email);

    void activeUser(String token);
}