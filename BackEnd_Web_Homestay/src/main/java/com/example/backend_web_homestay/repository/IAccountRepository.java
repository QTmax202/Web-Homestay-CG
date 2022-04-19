package com.example.backend_web_homestay.repository;


import com.example.backend_web_homestay.DTO.ProfileDTO;
import com.example.backend_web_homestay.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByGmail(String username);

    Boolean existsByGmail(String username);

    Boolean existsByPassword(String password);

    Optional<Account> findAccountByGmailAndPassword(String username,String password);

//    confirm mail
    @Query("	SELECT 	a.status 		"
            + "	FROM 	Account a		"
            + " WHERE 	a.gmail = :gmail ")
    Account findStatusByEmail(@Param("gmail") String gmail);

}
