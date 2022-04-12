package com.example.backend_web_homestay.repository;

import com.example.backend_web_homestay.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {

    Set<Role> findByRole(String name);

}
