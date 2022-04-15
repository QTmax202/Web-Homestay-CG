package com.example.backend_web_homestay.service.StatusHomestay;

import com.example.backend_web_homestay.model.StatusHomestay;
import com.example.backend_web_homestay.repository.IStatusHomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StatusHomestayService implements IStatusHomestayService{
    @Autowired
    private IStatusHomestayRepository statusHomestayRepository;

    @Override
    public Iterable<StatusHomestay> findAll() {
        return statusHomestayRepository.findAll();
    }

    @Override
    public Optional<StatusHomestay> findById(Long id) {
        return statusHomestayRepository.findById(id);
    }

    @Override
    public StatusHomestay save(StatusHomestay statusHomestay) {
        return statusHomestayRepository.save(statusHomestay);
    }

    @Override
    public void remove(Long id) {
        statusHomestayRepository.deleteById(id);
    }
}
