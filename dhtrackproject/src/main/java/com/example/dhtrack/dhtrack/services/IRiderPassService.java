package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.RiderPass;

import java.util.List;
import java.util.Optional;

public interface IRiderPassService {
    List<RiderPass> findAll();
    Optional<RiderPass> findByEmail(String email);
    Optional<RiderPass> findByName(String name);
    boolean existsByEmail(String email);
    boolean existsByName(String name);
    void deleteByEmail(String email);
    RiderPass save(RiderPass riderPass);

}
