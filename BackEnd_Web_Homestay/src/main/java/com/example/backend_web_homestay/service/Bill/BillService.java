package com.example.backend_web_homestay.service.Bill;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.repository.IBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillService implements IBillService{
    @Autowired
    private IBillRepository billRepository;

    @Override
    public Iterable<Bill> findAll() {
        return null;
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Bill save(Bill bill) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public Iterable<YourBillDTO> getYourBillByAccountId(long id) {
        return billRepository.getYourBillByAccountId(id);
    }

    @Override
    public Iterable<MyBillDTO> getMyBillByAccountId(long id) {
        return billRepository.getMyBillByAccountId(id);
    }
}
