package com.example.backend_web_homestay.service.HomeStay;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.service.IGeneralService;

import java.util.List;

public interface IHomestayService extends IGeneralService<Homestay> {
    Iterable<Homestay> findAllHomeStay(long id);

    Iterable<MyHomestayDTO> getHomestayByAccountId(long id);
}

