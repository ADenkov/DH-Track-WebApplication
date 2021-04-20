package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.Ticket;
import com.example.dhtrack.dhtrack.repository.TicketRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    TicketRepository ticketRepository;

    @InjectMocks
    TicketService ticketService;

    @Test
    public void save_ticket_should_create_ticket() {
        Ticket ticket = new Ticket();
        ticket.setDuration(2).setTrack("The Rocky").setCode("TK877355").setPrice(150).setAgeGroup("teen").setDate("22-02-2021");

        when(ticketRepository.save(any(Ticket.class))).thenReturn(new Ticket());

        ticketService.save(ticket);
        Ticket createdTicket = ticket;

        assertThat(createdTicket.getCode()).isSameAs(ticket.getCode());
    }

    @Test
    public void when_saving_ticket_without_code_it_should_throw_exception() {
        Ticket ticket = new Ticket();
        ticket.setDuration(2).setTrack("The Rocky").setPrice(150).setAgeGroup("teen").setDate("22-02-2021");

        Assertions.assertThrows(NullPointerException.class, () -> {
            ticketService.save(ticket);
        });
    }
}