package com.example.backend_web_homestay.service.HomeStay;

import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.repository.IHomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HomestayService implements IHomestayService{

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
}