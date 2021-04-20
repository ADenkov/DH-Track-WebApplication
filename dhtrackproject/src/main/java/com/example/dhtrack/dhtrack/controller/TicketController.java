package com.example.dhtrack.dhtrack.controller;


import com.example.dhtrack.dhtrack.model.Ticket;
import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.services.ITicketService;
import com.example.dhtrack.dhtrack.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@PreAuthorize("isAuthenticated()")
@Controller
@RequestMapping(path="/ticket") //
@CrossOrigin(origins = {"*", "*"})
public class TicketController {

    @Autowired
    private ITicketService ticketService;

    @Autowired
    private IUserService userService;


    @PostMapping("/{email}/add")
    public ResponseEntity<Ticket> addNewTicket(@PathVariable("email") String email, @RequestBody Ticket ticket) {
        ticketService.save(ticket);
        Optional<User> user = userService.findByEmail(email);
        User updatedUser = user.get();
        updatedUser.setTicket(ticket);
        userService.save(updatedUser);
        return new ResponseEntity<Ticket>(HttpStatus.CREATED);
    }


    @GetMapping(path="/all")
    public @ResponseBody
    List<Ticket> getAllTickets() {
        return ticketService.findAll();
    }


    @GetMapping("/{code}")
    public ResponseEntity<Ticket> getTicket(@PathVariable("code") String code) {
        Optional<Ticket> result = ticketService.findByCode(code);
        return result.map(client -> new ResponseEntity<>(client, HttpStatus.OK)).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Transactional
    @DeleteMapping("/{code}/delete")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable("code") String code){
        if (ticketService.existsByCode(code)) {
            ticketService.deleteByCode(code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
