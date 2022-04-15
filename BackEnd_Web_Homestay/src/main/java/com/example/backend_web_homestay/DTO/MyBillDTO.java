package com.example.backend_web_homestay.DTO;

import java.time.LocalDate;

public interface MyBillDTO {
    Long getId();

    LocalDate getEndDate();

    LocalDate getRegisDate();

    LocalDate getStartDate();

    Long getHomeId();

    Long getStatusHomeId();

    Long getPrice();

    String getHomestayName();

    String getAccountName();

    Double getAvgRate();

    Long getRoundRate();
}
