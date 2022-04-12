package com.example.backend_web_homestay.repository;


import org.springframework.stereotype.Repository;


@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByGmail(String username);

    Boolean existsByGmail(String username);

    Optional<Account> findAccountByGmailAndPassword(String username,String password);

}
