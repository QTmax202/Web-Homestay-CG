package com.example.backend_web_homestay.service.Bill;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.TurnOverDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.repository.IBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Iterable<YourBillDTO> getYourBillByAccountId(long id) {
        return billRepository.getYourBillByAccountId(id);
    }

    @Override
    public Iterable<MyBillDTO> getMyBillByAccountId(long id) {
        return billRepository.getMyBillByAccountId(id);
    }

    @Override
    public Iterable<Bill> findBillByHomeStayId(Long id) {
        return billRepository.getBillByHomestay_Id(id);
    }

    @Override
    public Iterable<TurnOverDTO> findTurnOverByAccountAndStartDate(long id, String startDate1, String startDate2) {
        return billRepository.findTurnOverByAccountAndStartDate(id, startDate1, startDate2);
    }
}
