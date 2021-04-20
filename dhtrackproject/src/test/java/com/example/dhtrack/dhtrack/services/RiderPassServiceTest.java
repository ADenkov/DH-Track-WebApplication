package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.model.Ticket;
import com.example.dhtrack.dhtrack.repository.RiderPassRepository;
import com.example.dhtrack.dhtrack.repository.TicketRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RiderPassServiceTest {
    @Mock
    RiderPassRepository passRepository;

    @InjectMocks
    RiderPassService passService;

    @Test
    public void save_riderPass_should_create_riderPass() {
        RiderPass pass = new RiderPass();
        pass.setEmail("joshkata@gmail.com").setName("Josh").setApprovedForTrack("").setSkill("Intermediate").setSkillClarification("Very active biker");

        when(passRepository.save(any(RiderPass.class))).thenReturn(new RiderPass());

        passService.save(pass);
        RiderPass createdPass = pass;

        assertThat(createdPass.getEmail()).isSameAs(pass.getEmail());
    }

    @Test
    public void when_saving_riderPass_without_email_it_should_throw_exception() {
        RiderPass pass = new RiderPass();
        pass.setName("Josh").setApprovedForTrack("").setSkill("Intermediate").setSkillClarification("Very active biker");

        Assertions.assertThrows(NullPointerException.class, () -> {
            passService.save(pass);
        });
    }
}