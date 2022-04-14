package com.example.backend_web_homestay.service.Homestay;


import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.repository.CityRepository;
import com.example.backend_web_homestay.repository.HomestayTypeRepository;
import com.example.backend_web_homestay.repository.IHomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HomestayService implements IHomestayService {
    @Autowired
    private IHomestayRepository homestayRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private HomestayTypeRepository homestayTypeRepository;


    @Override
    public Iterable<Homestay> findAllHomeStay(long id) {
        return findAllHomeStay(id);
    }

    @Override
    public Iterable<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }


    @Override
    public Iterable<Homestay> findAll() {
        return null;
    }

    @Override
    public Optional<Homestay> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Homestay save(Homestay homestay) {
        return homestayRepository.save(homestay);
    }

    @Override
    public void remove(Long id) {
        homestayRepository.deleteById(id);
    }

    @Override
    public void delete(Long id) {
        homestayRepository.deleteById(id);
    }

    @Override
    public Iterable<HomestayType> findAllTypes() {
        return homestayTypeRepository.findAll();
    }

    @Override
    public Iterable<City> findAllCity() {
        return cityRepository.findAll();
    }
}