package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.RegistrationUserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface IRegistrationUserTokenRepository extends JpaRepository<RegistrationUserToken, Long> {
    RegistrationUserToken findByToken(String token);

    boolean existsByToken(String token);

    @Transactional
    @Modifying
    @Query("delete from RegistrationUserToken r where r.account.id = :accId")
    public void deleteByUserId(int accId);

    @Query("select r.token from RegistrationUserToken r where r.account.id = :accId")
    public String findByUserId(long accId);
}