package com.example.backend_web_homestay.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "image_of_homestay")
public class ImageOfHomestay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String images;

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    public ImageOfHomestay() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Homestay getHomestay() {
        return homestay;
    }

    public void setHomestay(Homestay homestay) {
        this.homestay = homestay;
    }
}
