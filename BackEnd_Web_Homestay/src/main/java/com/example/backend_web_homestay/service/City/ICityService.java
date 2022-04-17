package com.example.backend_web_homestay.service.City;

import com.example.backend_web_homestay.DTO.CityDTO;

public interface ICityService {
    Iterable<CityDTO> getCityTop1();

    Iterable<CityDTO> getCityTop2();

    Iterable<CityDTO> getCityTop3();
}
