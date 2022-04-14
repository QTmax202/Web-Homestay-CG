package com.example.backend_web_homestay.service.Homestay;

import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.service.IGeneralService;

import java.util.Optional;

public interface IHomestayService extends IGeneralService<Homestay> {
    Iterable<Homestay> findAllHomeStay(long id);

    Iterable<Homestay> getAllHomestays();

    Optional<Homestay> findById(Long id);

    Homestay save(Homestay homestay);

    void delete(Long id);

    Iterable<HomestayType> findAllTypes();


    Iterable<City> findAllCity();
}

