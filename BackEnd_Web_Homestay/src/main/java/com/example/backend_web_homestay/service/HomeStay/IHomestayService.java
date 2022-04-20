package com.example.backend_web_homestay.service.HomeStay;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.service.IGeneralService;

import java.util.List;

public interface IHomestayService extends IGeneralService<Homestay> {
    Iterable<Homestay> findAllHomeStay(long id);

    List<MyHomestayDTO> getAllMyHomestayRate(long id);

    List<MyHomestayDTO> getAllYourHomestayRate(long id);

    List<MyHomestayDTO> getAllHomestayRate();

    Iterable<MyHomestayDTO> findHomestayByNameAndCityAndPrice(String name, Long idCity, Long price1, Long price2);

    Iterable<MyHomestayDTO> findHomestayByNameAndCityAndPriceSignIn(Long idAcc, String name, Long idCity, Long price1, Long price2);

    Iterable<MyHomestayDTO> getTop5Homestay();
    Iterable<City> findAllCity();

    Iterable<HomestayType> findAllType();
}

