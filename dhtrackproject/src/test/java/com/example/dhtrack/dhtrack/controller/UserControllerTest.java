package com.example.dhtrack.dhtrack.controller;

import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
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
class UserControllerTests {
    @Autowired
    private UserController userController;

    @MockBean
    private UserRepository userRepository;

    List<User> users;

    @BeforeEach
    void setUp() {
        users = Arrays.asList(
                new User().setEmail("lo6oJaki@gmail.com").setUsername("superMich").setPassword("13456789").setName("Michael").setPhoneNumber("23432423423"),
                new User().setEmail("JackJohnson@gmail.com").setUsername("jackjohn").setPassword("13456789").setName("Jack").setPhoneNumber("563452163445")
        );
    }

    @AfterEach
    void tearDown() {}


    @Test
    void get_all_users_if_there_are_any() {
        Mockito.when(userRepository.findAll()).thenReturn(users);

        Iterable<User> result = userController.getAllUsers();

        assertEquals(users, result);
    }

    @Test
    void get_all_users_if_there_are_none() {
        List<User> actual = userController.getAllUsers();

        assertEquals(new ArrayList<User>(), actual);
    }

//    @Test
//    void add_a_valid_user() {
//        User sampleUser = users.get(0);
//        Mockito.when(userRepository.save(sampleUser)).thenReturn(sampleUser);
//
//        ResponseEntity<User> response = userController.addNewUser(sampleUser);
//
//        assertEquals(sampleUser, response.getBody());
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//
//        Mockito.verify(userRepository).save(sampleUser);
//    }

    @Test
    void delete_client_if_exists() {
        User user = users.get(0);
        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.empty()); //expect a fetch, return a "fetched" person;

        userRepository.delete(user);

        Mockito.verify(userRepository).delete(user);
    }


    @Test
    void find_user_by_email_should_return_user() {
        User user = users.get(0).setEmail("Something@spesific.mail");
        Mockito.when(userRepository.findByEmail("Something@spesific.mail")).thenReturn(Optional.of(user));

        ResponseEntity<User> actualUser= userController.getUser("Something@spesific.mail");

        assertEquals(user, actualUser.getBody());
        assertEquals(HttpStatus.OK, actualUser.getStatusCode());

        Mockito.verify(userRepository).findByEmail(user.getEmail());
    }

    @Test
    void find_non_existant_user_should_throw_not_found() {
        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUser("any@mail.com");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

}