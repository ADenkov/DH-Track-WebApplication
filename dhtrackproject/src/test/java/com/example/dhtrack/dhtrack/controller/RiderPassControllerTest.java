package com.example.dhtrack.dhtrack.controller;

import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.repository.RiderPassRepository;
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
class RiderPassControllerTest {
    @Autowired
    private RiderPassController rpController;

    @MockBean
    private RiderPassRepository rpRepository;

    List<RiderPass> riderPasses;

    @BeforeEach
    void setUp() {
        riderPasses = Arrays.asList(
                new RiderPass().setEmail("lo6oJaki@gmail.com").setName("Michael").setApprovedForTrack("All Tracks").setSkill("Intermediate").setSkillClarification("I have been in the 2017 race in the australian mountain"),
                new RiderPass().setEmail("joshkata@gmail.com").setName("Josh").setApprovedForTrack("").setSkill("Intermediate").setSkillClarification("Very active biker")
        );
    }

    @Test
    void add_new_valid_pass() {
        RiderPass samplePass = riderPasses.get(0);
        Mockito.when(rpRepository.save(samplePass)).thenReturn(samplePass);

        ResponseEntity<RiderPass> response = rpController.addNewPass(riderPasses.get(0));

        assertEquals(samplePass, riderPasses.get(0));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Mockito.verify(rpRepository).save(samplePass);
    }

//    @Test
//    void decide_rider_pass() {
//        RiderPass samplePass = riderPasses.get(0).setApprovedForTrack("Rejected");
//        Mockito.when(rpRepository.save(samplePass)).thenReturn(samplePass);
//        rpController.addNewPass(samplePass);
//        rpRepository.save(samplePass);
//
//        ResponseEntity<RiderPass> response = rpController.decideRiderPass(samplePass.getEmail(), samplePass.getApprovedForTrack());
//
//        assertEquals(samplePass.getApprovedForTrack(), riderPasses.get(0).getApprovedForTrack());
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//
//        Mockito.verify(rpRepository).save(samplePass);
//    }

    @Test
    void get_all_passes_if_there_are_any() {
        Mockito.when(rpRepository.findAll()).thenReturn(riderPasses);

        Iterable<RiderPass> result = rpController.getAllRiderPasses();

        assertEquals(riderPasses, result);
    }

    @Test
    void get_all_passes_if_there_are_none() {
        List<RiderPass> actual = rpController.getAllRiderPasses();

        assertEquals(new ArrayList<RiderPass>(), actual);
    }

    @Test
    void get_pass_by_email_should_return_pass() {
        RiderPass pass = riderPasses.get(0).setEmail("Something@spesific.mail");
        Mockito.when(rpRepository.findByEmail("Something@spesific.mail")).thenReturn(Optional.of(pass));

        ResponseEntity<RiderPass> actualPass= rpController.getRiderPass("Something@spesific.mail");

        assertEquals(pass, actualPass.getBody());
        assertEquals(HttpStatus.OK, actualPass.getStatusCode());

        Mockito.verify(rpRepository).findByEmail(pass.getEmail());
    }

    @Test
    void delete_valid_riderPass() {
        RiderPass pass = riderPasses.get(0);
        Mockito.when(rpRepository.findById(pass.getId())).thenReturn(Optional.empty()); //expect a fetch, return a "fetched" person;

        rpRepository.delete(pass);

        Mockito.verify(rpRepository).delete(pass);
    }
}