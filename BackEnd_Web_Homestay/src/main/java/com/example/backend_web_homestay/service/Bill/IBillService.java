package com.example.backend_web_homestay.service.Bill;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.service.IGeneralService;

public interface IBillService extends IGeneralService<Bill> {
    Iterable<YourBillDTO> getYourBillByAccountId(long id);

    Iterable<MyBillDTO> getMyBillByAccountId(long id);

    Iterable<Bill> findBillByHomeStayId(Long id);
}
