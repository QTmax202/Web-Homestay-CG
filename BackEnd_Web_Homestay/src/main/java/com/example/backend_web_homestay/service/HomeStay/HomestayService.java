package com.example.backend_web_homestay.service.HomeStay;

import com.example.backend_web_homestay.DTO.MyHomestayDTO;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.repository.IHomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HomestayService implements IHomestayService {

    @Autowired
    private IHomestayRepository homestayRepository;

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
    public List<MyHomestayDTO> getAllMyHomestayRate(long id) {
        return homestayRepository.getAllMyHomestayRate(id);
    }

    @Override
    public List<MyHomestayDTO> getAllYourHomestayRate(long id) {
        return homestayRepository.getAllYourHomestayRate(id);
    }

    @Override
    public List<MyHomestayDTO> getAllHomestayRate() {
        return homestayRepository.getAllHomestayRate();
    }

    @Override
    public Iterable<Homestay> findHomestayByNameAndCityAndPrice(String name, Long idCity, Long price1, Long price2) {
        return homestayRepository.findHomestayByNameAndCityAndPrice(name, idCity, price1, price2);
    }

    @Override
    public Iterable<Homestay> findHomestayByNameAndCityAndPriceSignIn(Long idAcc, String name, Long idCity, Long price1, Long price2) {
        return homestayRepository.findHomestayByNameAndCityAndPriceSignIn(idAcc, name, idCity, price1, price2);
    }

    @Override
    public Iterable<MyHomestayDTO> getTop5Homestay() {
        return homestayRepository.getTop5Homestay();
    }
}