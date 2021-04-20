package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.repository.RiderPassRepository;
import com.example.dhtrack.dhtrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

@Service
public class RiderPassService implements IRiderPassService{

    @Autowired
    RiderPassRepository passRepository;

    @Override
    public List<RiderPass> findAll() {
        return passRepository.findAll();
    }

    @Override
    public Optional<RiderPass> findByEmail(String email) {
        return passRepository.findByEmail(email);
    }

    public Optional<RiderPass> findByName(String name) {
        return passRepository.findByName(name);
    }


    @Override
    public boolean existsByName(String name) {
        return passRepository.existsByName(name);
    }

    @Override
    public boolean existsByEmail(String email) {
        return passRepository.existsByEmail(email);
    }

    @Override
    public void deleteByEmail(String email) {
        passRepository.deleteByEmail(email);

    }

    @Override
    public RiderPass save(RiderPass riderPass) {
        requireNonNull(riderPass.getEmail());
        return passRepository.save(riderPass);
    }
}
