package com.example.backend_web_homestay.DTO;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.Homestay;

public interface RateDTO {
    Long getIdC();

    String getComment();

    Long getRate();

    String getTime();

    Account getAccountId();

    Homestay getHomestayId();
}
