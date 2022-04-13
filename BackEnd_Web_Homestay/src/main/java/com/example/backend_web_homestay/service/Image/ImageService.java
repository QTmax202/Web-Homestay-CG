package com.example.backend_web_homestay.service.Image;

import com.example.backend_web_homestay.model.ImageOfHomestay;
import com.example.backend_web_homestay.repository.IImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageService implements IImageService{

    @Autowired
    private IImageRepository imageRepository;

    @Override
    public Iterable<ImageOfHomestay> findAll() {
        return imageRepository.findAll();
    }

    @Override
    public Optional<ImageOfHomestay> findById(Long id) {
        return imageRepository.findById(id);
    }

    @Override
    public ImageOfHomestay save(ImageOfHomestay imageOfHomestay) {
        return imageRepository.save(imageOfHomestay);
    }

    @Override
    public void remove(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Iterable<ImageOfHomestay> findImageOfHomestaysByHomestay_Id(long id) {
        return imageRepository.findImageOfHomestaysByHomestay_Id(id);
    }
}
