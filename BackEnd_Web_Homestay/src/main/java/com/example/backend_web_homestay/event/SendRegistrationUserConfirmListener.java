package com.example.backend_web_homestay.event;

import com.example.backend_web_homestay.service.Gmail.IGmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class SendRegistrationUserConfirmListener implements ApplicationListener<OnSendRegistrationUserConfirmEvent> {
    @Autowired
    private IGmailService gmailService;

    private void sendConfirmViaEmail(String email) {
        gmailService.SendRegistrationUserConfirm(email);
    }

    @Override
    public void onApplicationEvent(OnSendRegistrationUserConfirmEvent event) {
        sendConfirmViaEmail(event.getEmail());
    }
}
