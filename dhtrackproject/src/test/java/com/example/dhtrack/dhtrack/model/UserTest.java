package com.example.dhtrack.dhtrack.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    User sampleUser;

    @BeforeEach
    void setUp() {
        long id=0;
        RiderPass rp = new RiderPass().setApprovedForTrack("All Tracks").setId(0).setName("Anthony").setEmail("anthony@gmail.com").setSkill("Beginner").setSkillClarification("blabla");
        sampleUser = new User().setId(id).setName("Anthony").setEmail("anthony@gmail.com").setPhoneNumber("123456789").setPassword("123456").setUsername("AnthonyTheDude").setRiderPass(rp);
//
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getName() {
        assertEquals("Anthony", sampleUser.getName());
    }

    @Test
    void setName() {
        sampleUser.setName("Michael");
        assertEquals("Michael", sampleUser.getName());
    }

    @Test
    void getPhoneNumber() {
        assertEquals("123456789", sampleUser.getPhoneNumber());
    }

    @Test
    void setPhoneNumber() {
        sampleUser.setPhoneNumber("23535245");
        assertEquals("23535245", sampleUser.getPhoneNumber());
    }

    @Test
    void getId() {
        assertEquals(0, sampleUser.getId());
    }

    @Test
    void setId() {
        sampleUser.setId((long) 6);
        assertEquals(6, sampleUser.getId());
    }

    @Test
    void getRiderPassApprovedForTrack() {
        RiderPass rp = new RiderPass().setApprovedForTrack("All Tracks").setId(0).setName("Anthony").setEmail("anthony@gmail.com").setSkill("Beginner").setSkillClarification("blabla");
        assertEquals("All Tracks", sampleUser.getRiderPass().getApprovedForTrack());
    }


    @Test
    void getUsername() {
        assertEquals("AnthonyTheDude", sampleUser.getUsername());
    }

    @Test
    void setUsername() {
        sampleUser.setUsername("michael");
        assertEquals("michael", sampleUser.getUsername());
    }

    @Test
    void getEmail() {
        assertEquals("anthony@gmail.com", sampleUser.getEmail());
    }



    @Test
    void setEmail() {
        sampleUser.setEmail("michael@gmail.com");
        assertEquals("michael@gmail.com", sampleUser.getEmail());
    }

    @Test
    void getPassword() {
        assertEquals("123456", sampleUser.getPassword());
    }

    @Test
    void setPassword() {
        sampleUser.setPassword("test");
        assertEquals("test", sampleUser.getPassword());
    }


//    @Test
//    void testToString() {
//    }
}