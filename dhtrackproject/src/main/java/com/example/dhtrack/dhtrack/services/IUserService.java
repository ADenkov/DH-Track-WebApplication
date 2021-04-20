package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    User save(User user);

}
