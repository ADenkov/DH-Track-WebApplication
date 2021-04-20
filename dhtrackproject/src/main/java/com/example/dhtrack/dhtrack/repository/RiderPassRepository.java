package com.example.dhtrack.dhtrack.repository;

import com.example.dhtrack.dhtrack.model.RiderPass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiderPassRepository extends JpaRepository<RiderPass, Long> {
    Boolean existsByName(String name);
    Optional<RiderPass> findByEmail(String email);
    Optional<RiderPass> findByName(String name);
    Boolean existsByEmail(String email);
    void deleteByEmail(String email);
    RiderPass save (RiderPass riderPass);
}
