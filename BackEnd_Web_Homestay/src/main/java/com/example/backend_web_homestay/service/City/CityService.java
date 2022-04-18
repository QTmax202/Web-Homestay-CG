package com.example.backend_web_homestay.service.City;

import com.example.backend_web_homestay.DTO.CityDTO;
import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.repository.ICityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    @Autowired
    private ICityRepository cityRepository;

    @Override
    public Iterable<CityDTO> getCityTop1() {
        return cityRepository.getCityTop1();
    }

    @Override
    public Iterable<CityDTO> getCityTop2() {
        return cityRepository.getCityTop2();
    }

    @Override
    public Iterable<CityDTO> getCityTop3() {
        return cityRepository.getCityTop3();
    }
}
