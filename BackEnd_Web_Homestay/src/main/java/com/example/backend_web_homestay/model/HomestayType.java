package com.example.backend_web_homestay.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "homestay_type")
public class HomestayType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public HomestayType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
