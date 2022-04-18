package com.example.backend_web_homestay.service.HomeStay;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.City;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.HomestayType;
import com.example.backend_web_homestay.repository.ICityRepository;
import com.example.backend_web_homestay.repository.IHomestayRepository;
import com.example.backend_web_homestay.repository.IHomestayTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomestayService implements IHomestayService {

    @Autowired
    private IHomestayRepository homestayRepository;
    @Autowired
    private ICityRepository cityRepository;

    @Autowired
    private IHomestayTypeRepository homestayTypeRepository;



    @Override
    public Iterable<Homestay> findAll() {
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
    public void remove(Long id) {
        homestayRepository.deleteById(id);
    }

    @Override
    public Iterable<Homestay> findAllHomeStay(long id) {
        return homestayRepository.findAllHomeStay(id);
    }

    @Override
    public List<MyHomestayDTO> getHomestayByAccountId(long id) {
        return homestayRepository.getHomestayByAccountId(id);
    }

    @Override
    public Iterable<Homestay> findHomestayByNameAndCityAndPrice(String name, Long idCity, Long price1, Long price2) {
        return homestayRepository.findHomestayByNameAndCityAndPrice(name, idCity, price1, price2);
    }

    @Override
    public Iterable<MyHomestayDTO> getTop5Homestay() {
        return homestayRepository.getTop5Homestay();
    }

    @Override
    public Iterable<City> findAllCity() {
        return cityRepository.findAll();
    }

    @Override
    public Iterable<HomestayType> findAllType() {
        return homestayTypeRepository.findAll();
    }
}