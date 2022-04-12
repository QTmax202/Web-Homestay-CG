package com.example.backend_web_homestay.service.BookHome;

import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.repository.IBookHomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookHomeService implements IBookHomeService {
    @Autowired
    private IBookHomeRepository homeRepository;

    @Override
    public Iterable<Bill> findAll() {
        return homeRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return homeRepository.findById(id);
    }

    @Override
    public Bill save(Bill bill) {
        return homeRepository.save(bill);
    }

    @Override
    public void remove(Long id) {
        homeRepository.deleteById(id);
    }
}
