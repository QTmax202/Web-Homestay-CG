package com.example.backend_web_homestay.service.Gmail;

import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.repository.IRegistrationUserTokenRepository;
import com.example.backend_web_homestay.service.Account.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GmailService implements IGmailService {
    @Autowired
    private IAccountService accountService;

    @Autowired
    public JavaMailSender mailSender;

    @Autowired
    private IRegistrationUserTokenRepository registrationUserTokenRepository;


    @Override
    public void SendRegistrationUserConfirm(String email) {
        Optional<Account> account = accountService.findByGmail(email);

        String token = registrationUserTokenRepository.findByUserId(account.get().getId());

        String confirmationUrl = "http://localhost:8080/api/sign-up/active-account?token=" + token;
        String subject = "Xác Nhận Đăng Ký Account";
        String content = "Bạn đã đăng kí thành công. Click vào link dưới đây để kích hoạt tài khoản \n" + confirmationUrl;

        sendEmail(email, subject, content);
    }

    private void sendEmail(final String recipientEmail, final String subject, final String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject(subject);
        message.setText(content);

        mailSender.send(message);
    }
}