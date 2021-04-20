package com.example.dhtrack.dhtrack.controller;

import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.model.RiderPass;

import com.example.dhtrack.dhtrack.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

@Controller
@RequestMapping(path="/user") //
@CrossOrigin(origins = {"*", "*"})
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/add")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<User>(HttpStatus.CREATED);
    }


    @GetMapping(path="/all")
    public @ResponseBody List<User> getAllUsers() {
        return userService.findAll();
    }


    @GetMapping("?username={username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        Optional<User> result = userService.findByUsername(username);
        return result.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
/*    @GetMapping("/{clientId}")
    public ResponseEntity<Client> getClient(@PathVariable long clientId) {
            Optional<Client> result = clientRepository.findById(clientId);
            return result.map(client -> new ResponseEntity<>(client, HttpStatus.OK)).orElseGet(
                    () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }*/

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable("email") String email) {
        Optional<User> result = userService.findByEmail(email);
        return result.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{email}/getPass")
    public ResponseEntity<RiderPass> getUserPass(@PathVariable("email") String email) {
        Optional<User> result = userService.findByEmail(email);
        RiderPass pass = result.get().getRiderPass();
        return new ResponseEntity<>(pass, HttpStatus.OK);
    }

    @PutMapping("/{email}/update")
    public ResponseEntity<User> updateUser(@PathVariable("email") String email, @RequestBody User updatedUser) {
        Optional<User> userInfo = userService.findByEmail(email);
        if (userInfo.isPresent()) {
            User user = userInfo.get();
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(encoder.encode(updatedUser.getPassword()));
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            userService.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

//    @PutMapping("/{email}/assignPass")
//    public ResponseEntity<User> assignRiderPass(@PathVariable("email") String email, @RequestBody RiderPass riderPass) {
//        Optional<User> userInfo = userService.findByEmail(email);
//        if (userInfo.isPresent()) {
//            User user = userInfo.get();
//            user.setRiderPass(riderPass);
//            userService.save(user);
//            System.out.println("riderPass: "+ user.getRiderPass());
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        }else{
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }


    @Transactional
    @DeleteMapping("/{email}/delete")
    public ResponseEntity<User> deleteUser(@PathVariable("email") String email){
        if (userService.existsByEmail(email)) {
            userService.deleteByEmail(email);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
