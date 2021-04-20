package com.example.dhtrack.dhtrack.repository;

import java.util.Optional;

import com.example.dhtrack.dhtrack.model.ERole;
import com.example.dhtrack.dhtrack.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

