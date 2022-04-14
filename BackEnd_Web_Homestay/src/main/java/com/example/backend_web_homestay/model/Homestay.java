package com.example.backend_web_homestay.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "homestay")
public class Homestay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private int bed_room;
    private int bath_room;
    private Long price;
    private Boolean status = false;
    private String description;

    @ManyToOne
    @JoinColumn(name = "homestay_type_id")
    private HomestayType homestay_type;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    public Homestay() {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getBed_room() {
        return bed_room;
    }

    public void setBed_room(int bed_room) {
        this.bed_room = bed_room;
    }

    public int getBath_room() {
        return bath_room;
    }

    public void setBath_room(int bath_room) {
        this.bath_room = bath_room;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HomestayType getHomestay_type() {
        return homestay_type;
    }

    public void setHomestay_type(HomestayType homestay_type) {
        this.homestay_type = homestay_type;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
