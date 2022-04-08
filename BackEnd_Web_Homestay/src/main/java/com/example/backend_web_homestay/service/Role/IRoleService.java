package com.example.backend_web_homestay.service.Role;

import com.example.backend_web_homestay.model.Role;
import com.example.backend_web_homestay.service.IGeneralService;

import java.util.Set;

public interface IRoleService extends IGeneralService<Role> {
    Set<Role> findByName(String name);
}
