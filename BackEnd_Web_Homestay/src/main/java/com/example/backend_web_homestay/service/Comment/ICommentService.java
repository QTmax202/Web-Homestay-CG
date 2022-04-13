package com.example.backend_web_homestay.service.Comment;

import com.example.backend_web_homestay.model.Comment;
import com.example.backend_web_homestay.service.IGeneralService;

public interface ICommentService extends IGeneralService<Comment> {
    Iterable<Comment> getCommentsByHomestayId(long id);
}