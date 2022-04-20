package com.example.backend_web_homestay.service.Notify;

import com.example.backend_web_homestay.model.Notify;
import com.example.backend_web_homestay.service.IGeneralService;

public interface INotifyService extends IGeneralService<Notify> {

    Iterable<Notify> getNotifyByAccountDesc(Long id);

    Iterable<Notify> check1NotifyByAccount(long id);
}
