package com.example.backend_web_homestay.service.Homestay;

import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.repository.CityRepository;
import com.example.backend_web_homestay.repository.HomestayRepository;
import com.example.backend_web_homestay.repository.HomestayTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HomestayService implements IHomestay {
    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private HomestayTypeRepository homestayTypeRepository;

    @Autowired
    private CityRepository cityRepository;


    @Override
    public Iterable<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }

    @Override
    public Optional<Homestay> findById(Long id) {
        return homestayRepository.findById(id);
    }

    @Override
    public Homestay save(Homestay homestay) {
        return homestayRepository.save(homestay);
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
