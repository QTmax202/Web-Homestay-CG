package com.example.backend_web_homestay.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "status_homestay")
public class StatusHomestay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;

    public StatusHomestay() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
