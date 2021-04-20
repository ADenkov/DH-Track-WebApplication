package com.example.dhtrack.dhtrack.repository;

import com.example.dhtrack.dhtrack.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByCode(String code);
    boolean existsByCode(String code);
    void deleteByCode(String code);

}
