package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.Ticket;

import java.util.List;
import java.util.Optional;

public interface ITicketService {
    List<Ticket> findAll();
    Optional<Ticket> findByCode(String code);
    boolean existsByCode(String code);
    void deleteByCode(String code);
    Ticket save(Ticket user);
}
