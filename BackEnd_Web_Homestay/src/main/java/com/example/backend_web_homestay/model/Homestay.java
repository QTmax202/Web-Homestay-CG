package com.example.backend_web_homestay.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
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

    @OneToMany(mappedBy = "homestay", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<ImageOfHomestay> imageOfHomestays;


    public Homestay() {
    }

    public Homestay(Long id, String name, String address, int bed_room, int bath_room, Long price, Boolean status, String description, HomestayType homestay_type, Account account, City city) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.bed_room = bed_room;
        this.bath_room = bath_room;
        this.price = price;
        this.status = status;
        this.description = description;
        this.homestay_type = homestay_type;
        this.account = account;
        this.city = city;
    }

    public List<ImageOfHomestay> getImageOfHomestays() {
        return imageOfHomestays;
    }

    public void setImageOfHomestays(List<ImageOfHomestay> imageOfHomestays) {
        this.imageOfHomestays = imageOfHomestays;
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
