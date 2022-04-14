package com.example.backend_web_homestay.service.Rate;

import com.example.backend_web_homestay.DTO.MyHomestay;
import com.example.backend_web_homestay.model.Rate;
import com.example.backend_web_homestay.service.IGeneralService;

import java.util.List;

public interface IRateService extends IGeneralService<Rate> {
    Iterable<Rate> getRateByHomestay(long id);

    Iterable<Rate> getRateByAccount(long id);

    List<MyHomestay> getHomestayByAccountId(long id);
}
