package com.example.backend_web_homestay.service.Image;

import com.example.backend_web_homestay.model.ImageOfHomestay;
import com.example.backend_web_homestay.service.IGeneralService;

public interface IImageService extends IGeneralService<ImageOfHomestay> {
    Iterable<ImageOfHomestay> findImageOfHomestaysByHomestay_Id(long id);
}
