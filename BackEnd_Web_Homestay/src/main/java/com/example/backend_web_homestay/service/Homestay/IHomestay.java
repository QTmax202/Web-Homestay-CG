package com.example.backend_web_homestay.service.Homestay;

import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;

import java.util.List;
import java.util.Optional;

public interface IHomestay {
    Iterable<Homestay> getAllHomestays();

    Optional<Homestay> findById(Long id);

    Homestay save(Homestay homestay);

    void delete(Long id);

    Iterable<HomestayType> findAllTypes();


    Iterable<City> findAllCity();
}
