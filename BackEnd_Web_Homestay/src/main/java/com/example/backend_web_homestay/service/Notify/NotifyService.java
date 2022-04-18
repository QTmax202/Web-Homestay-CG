package com.example.backend_web_homestay.service.Notify;

import com.example.backend_web_homestay.model.Notify;
import com.example.backend_web_homestay.repository.INotifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotifyService implements INotifyService{
    @Autowired
    private INotifyRepository notifyRepository;

    @Override
    public Iterable<Notify> findAll() {
        return notifyRepository.findAll();
    }

    @Override
    public Optional<Notify> findById(Long id) {
        return notifyRepository.findById(id);
    }

    @Override
    public Notify save(Notify notify) {
        return notifyRepository.save(notify);
    }

    @Override
    public void remove(Long id) {
        notifyRepository.deleteById(id);
    }
}
