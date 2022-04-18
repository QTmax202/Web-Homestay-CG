package com.example.backend_web_homestay.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "notify")
public class Notify {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private LocalDate date_notify;

    private Boolean status_client = false;
    private Boolean status_host = false;
    private String content;

    public Notify() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Homestay getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestay homestay) {
        this.homestay = homestay;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDate_notify() {
        return date_notify;
    }

    public void setDate_notify(LocalDate date_notify) {
        this.date_notify = date_notify;
    }

    public Boolean getStatus_client() {
        return status_client;
    }

    public void setStatus_client(Boolean status_client) {
        this.status_client = status_client;
    }

    public Boolean getStatus_host() {
        return status_host;
    }

    public void setStatus_host(Boolean status_host) {
        this.status_host = status_host;
    }
}
