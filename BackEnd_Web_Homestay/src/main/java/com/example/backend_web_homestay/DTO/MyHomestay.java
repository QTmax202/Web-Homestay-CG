package com.example.backend_web_homestay.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MyHomestay {

    private Long id;

    private String name;

    private Long price;

    private String description;

    private String address;

    private String value_rate;

    private String images;

    public MyHomestay() {
    }

    public MyHomestay(Long id, String name, Long price, String description, String address, String value_rate, String images) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.address = address;
        this.value_rate = value_rate;
        this.images = images;
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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getValue_rate() {
        return value_rate;
    }

    public void setValue_rate(String value_rate) {
        this.value_rate = value_rate;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }
}
