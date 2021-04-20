package com.example.dhtrack.dhtrack.controller;

import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.model.Ticket;
import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.repository.RiderPassRepository;
import com.example.dhtrack.dhtrack.repository.TicketRepository;
import com.example.dhtrack.dhtrack.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class TicketControllerTest {

    @Autowired
    private TicketController ticketController;

    @MockBean
    private TicketRepository ticketRepository;

    List<Ticket> tickets;


    @BeforeEach
    void setUp() {
        tickets = Arrays.asList(
                new Ticket().setDuration(2).setTrack("The Rocky").setCode("TK877355").setPrice(150).setAgeGroup("teen").setDate("22-02-2021"),
                new Ticket().setDuration(1).setTrack("Need for Speed").setCode("TK534267").setPrice(80).setAgeGroup("adult").setDate("21-01-2021")
        );
    }

//    @Test
//    void add_new_valid_ticket() {
//        Ticket sampleTicket = tickets.get(0);
//        Mockito.when(ticketRepository.save(sampleTicket)).thenReturn(sampleTicket);
//
//        ResponseEntity<Ticket> response = ticketController.addNewTicket("lo6oJaki@gmail.com", tickets.get(0));
//
//        assertEquals(sampleTicket, tickets.get(0));
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//
//        Mockito.verify(ticketRepository).save(sampleTicket);
//    }


//    @Test
//    void get_all_tickets_if_there_are_any() {
//        Mockito.when(ticketRepository.findAll()).thenReturn(tickets);
//
//        Iterable<Ticket> result = ticketController.getAllTickets();
//
//        assertEquals(tickets, result);
//    }
////
//    @Test
//    void get_all_tickets_if_there_are_none() {
//        List<Ticket> actual = ticketController.getAllTickets();
//
//        assertEquals(new ArrayList<Ticket>(), actual);
//    }
//
//    @Test
//    void get_ticket_by_code_should_return_ticket() {
//        Ticket ticket = tickets.get(0);
//        Mockito.when(ticketRepository.findByCode(ticket.getCode())).thenReturn(Optional.of(ticket));
//
//        ResponseEntity<Ticket> actualTicket= ticketController.getTicket(ticket.getCode());
//
//        assertEquals(ticket, actualTicket.getBody());
//        assertEquals(HttpStatus.OK, actualTicket.getStatusCode());
//
//        Mockito.verify(ticketRepository).findByCode(ticket.getCode());
//    }

    @Test
    void delete_valid_ticket() {
        Ticket ticket = tickets.get(0);
        Mockito.when(ticketRepository.findById(ticket.getTicketId())).thenReturn(Optional.empty()); //expect a fetch, return a "fetched" person;

        ticketRepository.delete(ticket);

        Mockito.verify(ticketRepository).delete(ticket);
    }
}