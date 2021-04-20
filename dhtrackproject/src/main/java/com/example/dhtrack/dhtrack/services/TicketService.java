package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.Ticket;
import com.example.dhtrack.dhtrack.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

@Service
public class TicketService implements ITicketService {

    @Autowired
    TicketRepository ticketRepository;

    @Override
    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    @Override
    public Optional<Ticket> findByCode(String code) {
        return ticketRepository.findByCode(code);
    }

    @Override
    public boolean existsByCode(String code) {
        return ticketRepository.existsByCode(code);
    }


    @Override
    public void deleteByCode(String code) {
        ticketRepository.deleteByCode(code);
    }

    @Override
    public Ticket save(Ticket ticket) {
        requireNonNull(ticket.getCode());
        return ticketRepository.save(ticket);
    }
}
