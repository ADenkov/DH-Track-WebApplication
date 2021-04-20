package com.example.dhtrack.dhtrack.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TicketTest {
    Ticket sampleTicket;
    User sampleUser = new User().setId(0).setName("Anthony").setEmail("anthony@gmail.com").setPhoneNumber("123456789").setPassword("123456").setUsername("AnthonyTheDude");

    @BeforeEach
    void setUp() {
        sampleTicket = new Ticket().setCode("t2341").setDate("12-09-2021").setDuration(3).setPrice(80).setTrack("The Rocky").setUser(sampleUser);

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getPrice() {
        assertEquals(80, sampleTicket.getPrice());
    }

    @Test
    void setPrice() {
        sampleTicket.setPrice(75);
        assertEquals(75, sampleTicket.getPrice());
    }

    @Test
    void getCode() {
        assertEquals("t2341", sampleTicket.getCode());
    }

    @Test
    void setCode() {
        sampleTicket.setCode("t5555");
        assertEquals("t5555", sampleTicket.getCode());
    }

    @Test
    void getTrack() {
        assertEquals("The Rocky", sampleTicket.getTrack());
    }

    @Test
    void setTrack() {
        sampleTicket.setTrack("Need for Speed");
        assertEquals("Need for Speed", sampleTicket.getTrack());
    }

    @Test
    void getUser() {
        assertEquals(sampleUser, sampleTicket.getUser());
    }

    @Test
    void setUser() {
        User newUser = new User().setId(0).setName("Anthony").setEmail("anthony@gmail.com").setPhoneNumber("123456789").setPassword("123456").setUsername("AnthonyTheDude");
        sampleTicket.setUser(newUser);
        assertEquals(newUser, sampleTicket.getUser());
    }

    @Test
    void getDuration() {
        assertEquals(3, sampleTicket.getDuration());
    }

    @Test
    void setDuration() {
        sampleTicket.setDuration(2);
        assertEquals(2, sampleTicket.getDuration());
    }

    @Test
    void getDate() {
        assertEquals("12-09-2021", sampleTicket.getDate());
    }

    @Test
    void setDate() {
        sampleTicket.setDate("13-10-2021");
        assertEquals("13-10-2021", sampleTicket.getDate());
    }
}