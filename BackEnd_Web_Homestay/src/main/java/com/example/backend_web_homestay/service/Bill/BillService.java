package com.example.backend_web_homestay.service.Bill;

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
        return billRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return billRepository.findById(id);
    }

    @Override
    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public void remove(Long id) {
        billRepository.deleteById(id);
    }

    @Override
    public Iterable<Bill> findBillByHomeStayId(Long id) {
        return billRepository.getBillByHomestay_Id(id);
    }
}
