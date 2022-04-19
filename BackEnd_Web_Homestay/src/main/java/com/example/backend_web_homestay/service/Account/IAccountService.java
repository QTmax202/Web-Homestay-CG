package com.example.backend_web_homestay.service.Account;

import com.example.backend_web_homestay.DTO.ProfileDTO;
import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.service.IGeneralService;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IAccountService extends IGeneralService<Account>, UserDetailsService {

    Optional<Account> findByGmail(String username);

    Account update(Account account);

    Boolean existsByGmail(String username);

    Boolean existsByPassword(String password);

    Optional<Account> findAccountByGmailAndPassword(String username,String password);

    Optional<Account> findUserByEmail(String email);

    void activeUser(String token);
}
