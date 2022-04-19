package com.example.backend_web_homestay.service.Comment;

import com.example.backend_web_homestay.DTO.RateDTO;
import com.example.backend_web_homestay.model.Comment;
import com.example.backend_web_homestay.service.IGeneralService;

public interface ICommentService extends IGeneralService<Comment> {
    Iterable<Comment> getCommentsByHomestayId(long id);

    Iterable<Comment> getRateAndCommentByHomestay(Long id);

    Boolean existsCommentByAccount_IdAndHomestay_Id(long accountId, long homestayId);
}