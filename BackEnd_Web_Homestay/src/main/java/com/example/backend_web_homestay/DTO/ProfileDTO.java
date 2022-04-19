package com.example.backend_web_homestay.DTO;

public class ProfileDTO {
    private String name;
    private String gmail;
    private String phone_number;
    private String address;
    private String avatar_url;

    public ProfileDTO() {
    }

    public ProfileDTO(String name, String gmail, String phone_number, String address, String avatar) {
        this.name = name;
        this.gmail = gmail;
        this.phone_number = phone_number;
        this.address = address;
        this.avatar_url = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }
}
