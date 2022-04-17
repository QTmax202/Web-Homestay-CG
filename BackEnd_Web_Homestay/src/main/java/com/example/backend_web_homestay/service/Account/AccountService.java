package com.example.backend_web_homestay.service.Account;

import com.example.backend_web_homestay.event.OnSendRegistrationUserConfirmEvent;
import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.AccountPrinciple;
import com.example.backend_web_homestay.model.RegistrationUserToken;
import com.example.backend_web_homestay.repository.IAccountRepository;
import com.example.backend_web_homestay.repository.IRegistrationUserTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService implements IAccountService{
    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private IRegistrationUserTokenRepository registrationUserTokenRepository;

    @Override
    public Optional<Account> findByGmail(String username) {
        return accountRepository.findByGmail(username);
    }

    @Override
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public Iterable<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }



    @Override
    public void remove(Long id) {
        accountRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> userOptional = accountRepository.findByGmail(username);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return AccountPrinciple.build(userOptional.get());
    }

    @Override
    public Boolean existsByGmail(String username) {
        return accountRepository.existsByGmail(username);
    }

    @Override
    public Optional<Account> findAccountByGmailAndPassword(String username, String password) {
        return accountRepository.findAccountByGmailAndPassword(username, password);
    }

    @Override
    public Account save(Account account) {
        Account acc = accountRepository.save(account);

        //create new user registration token
        createNewRegistrationUserToken(account);

        //send mail to confirm
        sendConfirmRegistrationViaEmail(account.getGmail());

        return acc;
    }

    private void createNewRegistrationUserToken(Account account) {
        final String newToken = UUID.randomUUID().toString();

        RegistrationUserToken token = new RegistrationUserToken(newToken, account);
        registrationUserTokenRepository.save(token);
    }

    private void sendConfirmRegistrationViaEmail(String email) {
        applicationEventPublisher.publishEvent(new OnSendRegistrationUserConfirmEvent(email));
    }

    @Override
    public Optional<Account> findUserByEmail(String email) {
        return accountRepository.findByGmail(email);
    }

    @Override
    public void activeUser(String token) {
        RegistrationUserToken registrationUserToken =registrationUserTokenRepository.findByToken(token);

        Account account =registrationUserToken.getAccount();
        account.setStatus(true);

        accountRepository.save(account);

        registrationUserTokenRepository.deleteById(registrationUserToken.getId());
    }

}
