package com.example.dhtrack.dhtrack.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RiderPassTest {
    RiderPass samplePass;

    @BeforeEach
    void setUp() {
        long id=0;
        samplePass = new RiderPass().setId(id).setApprovedForTrack("All Tracks").setId(0).setName("Anthony").setEmail("anthony@gmail.com").setSkill("Beginner").setSkillClarification("blabla");
//
    }

    @Test
    void getSkill() {
        assertEquals("Beginner", samplePass.getSkill());
    }

    @Test
    void setSkill() {
        samplePass.setSkill("Intermediate");
        assertEquals("Intermediate", samplePass.getSkill());
    }

    @Test
    void getName() {
        assertEquals("Anthony", samplePass.getName());
    }

    @Test
    void setName() {
        samplePass.setName("Michael");
        assertEquals("Michael", samplePass.getName());
    }

    @Test
    void getSkillClarification() {
        assertEquals("blabla", samplePass.getSkillClarification());
    }

    @Test
    void setSkillClarification() {
        samplePass.setSkillClarification("I am a professional biker");
        assertEquals("I am a professional biker", samplePass.getSkillClarification());
    }

    @Test
    void getId() {
        assertEquals(0, samplePass.getId());
    }

    @Test
    void setId() {
        samplePass.setId(1);
        assertEquals(1, samplePass.getId());
    }

    @Test
    void getEmail() {
        assertEquals("anthony@gmail.com", samplePass.getEmail());
    }

    @Test
    void setEmail() {
        samplePass.setEmail("test@gmail.com");
        assertEquals("test@gmail.com", samplePass.getEmail());
    }

    @Test
    void getApprovedForTrack() {
        assertEquals("All Tracks", samplePass.getApprovedForTrack());

    }

    @Test
    void setApprovedForTrack() {
        samplePass.setApprovedForTrack("Rejected");
        assertEquals("Rejected", samplePass.getApprovedForTrack());
    }
}