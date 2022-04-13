package com.example.backend_web_homestay.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "registration")
public class RegistrationUserToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String token;

    @OneToOne(targetEntity = Account.class, fetch = FetchType.EAGER)
    private Account account;

    private Date expiryDate;

    public RegistrationUserToken(String token, Account account) {
        this.token = token;
        this.account = account;

        //1h
        expiryDate = new Date(System.currentTimeMillis() + 360000);
    }
}