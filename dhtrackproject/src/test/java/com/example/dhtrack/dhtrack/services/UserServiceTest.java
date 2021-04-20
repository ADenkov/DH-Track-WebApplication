package com.example.dhtrack.dhtrack.services;

import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    public void save_user_should_return_user() {
        User user = new User();
        user.setEmail("JackJohnson@gmail.com").setUsername("jackjohn").setPassword("13456789").setName("Jack").setPhoneNumber("563452163445");

        when(userRepository.save(any(User.class))).thenReturn(new User());

        userService.save(user);
        User createdUser = user;

        assertThat(createdUser.getEmail()).isSameAs(user.getEmail());
    }

    @Test
    public void when_saving_user_without_email_it_should_throw_exception() {
        User user = new User();
        user.setUsername("jackjohn").setPassword("13456789").setName("Jack").setPhoneNumber("563452163445");

        Assertions.assertThrows(NullPointerException.class, () -> {
            userService.save(user);
        });
    }

//    @Test
//    public void find_user_by_email_should_return_user() {
//        User user = new User();
//        user.setEmail("JackJohnson@gmail.com").setUsername("jackjohn").setPassword("13456789").setName("Jack").setPhoneNumber("563452163445");
//        userService.save(user);
//
//        when(userRepository.save(any(User.class))).thenReturn(new User());
//
//        assertThat(userService.findByEmail("JackJohnson@gmail.com")).isSameAs("JackJohnson@gmail.com");
//    }
}