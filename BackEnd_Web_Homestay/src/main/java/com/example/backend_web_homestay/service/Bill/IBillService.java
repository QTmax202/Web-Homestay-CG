package com.example.backend_web_homestay.service.Bill;

import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.TurnOverDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.service.IGeneralService;

import java.time.LocalDate;

public interface IBillService extends IGeneralService<Bill> {
    Iterable<YourBillDTO> getYourBillByAccountId(long id);

    Iterable<MyBillDTO> getMyBillByAccountId(long id);

    Iterable<Bill> findBillByHomeStayId(Long id);

    Iterable<TurnOverDTO> findTurnOverByAccountAndStartDate(long id, String startDate1, String startDate2);
}
