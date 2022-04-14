package com.example.backend_web_homestay.service.Rate;

import com.example.backend_web_homestay.DTO.MyHomestay;
import com.example.backend_web_homestay.model.Rate;
import com.example.backend_web_homestay.repository.IRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RateService implements IRateService {
    @Autowired
    private IRateRepository rateRepository;

    @Override
    public Iterable<Rate> findAll() {
        return rateRepository.findAll();
    }

    @Override
    public Optional<Rate> findById(Long id) {
        return rateRepository.findById(id);
    }

    @Override
    public Rate save(Rate rate) {
        return rateRepository.save(rate);
    }

    @Override
    public void remove(Long id) {
        rateRepository.deleteById(id);
    }

    @Override
    public Iterable<Rate> getRateByHomestay(long id) {
        return rateRepository.findRatesByHomestay_Id(id);
    }

    @Override
    public Iterable<Rate> getRateByAccount(long id) {
        return rateRepository.findRatesByAccount_Id(id);
    }

    @Override
    public List<MyHomestay> getHomestayByAccountId(long id) {
        return rateRepository.getHomestayByAccountId(id);
    }
}
