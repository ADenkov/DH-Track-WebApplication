package com.example.dhtrack.dhtrack.controller;


import com.example.dhtrack.dhtrack.model.EPassDecision;
import com.example.dhtrack.dhtrack.model.RiderPass;
import com.example.dhtrack.dhtrack.model.User;
import com.example.dhtrack.dhtrack.services.IRiderPassService;
import com.example.dhtrack.dhtrack.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path="/riderPass") //
@CrossOrigin(origins = {"*", "*"})
public class RiderPassController {
    @Autowired
    private IRiderPassService passService;

    @Autowired
    private IUserService userService;

    @PostMapping("/add")
    public ResponseEntity<RiderPass> addNewPass(@RequestBody RiderPass riderPass) {
        passService.save(riderPass);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping("/{email}/decide")
    public ResponseEntity<RiderPass> decideRiderPass(@PathVariable("email") String email, @RequestBody String decision) {
        System.out.println(email + " decision: "+ decision);
        Optional<RiderPass> riderPass = passService.findByEmail(email);
        Optional<User> user = userService.findByEmail(email);
        if (riderPass.isPresent()) {
            RiderPass updatedPass = riderPass.get();
            User updatedUser = user.get();
            System.out.println("previous riderPass: "+ updatedPass.getApprovedForTrack());

            updatedPass.setApprovedForTrack(decision);
            passService.save(updatedPass);

            updatedUser.setRiderPass(updatedPass);
            userService.save(updatedUser);
            System.out.println("updated user pass: " + updatedUser.getRiderPass());
            riderPass = passService.findByEmail(email);
            updatedPass = riderPass.get();
            System.out.println("Retrieved pass: " + updatedPass.getApprovedForTrack());
            return new ResponseEntity<>(updatedPass, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(path="/all")
    public @ResponseBody
    List<RiderPass> getAllRiderPasses() {
        return passService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byEmail/{email}")
    public ResponseEntity<RiderPass> getRiderPass(@PathVariable("email") String email) {
        Optional<RiderPass> result = passService.findByEmail(email);
        return result.map(riderPass -> new ResponseEntity<>(riderPass, HttpStatus.OK)).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{name}")
    public ResponseEntity<RiderPass> getRiderPassByName(@PathVariable("name") String name) {
        Optional<RiderPass> result = passService.findByName(name);
        return result.map(riderPass -> new ResponseEntity<>(riderPass, HttpStatus.OK)).orElseGet(
                () -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @Transactional
    @DeleteMapping("/{email}/delete")
    public ResponseEntity<RiderPass> deleteRiderPass(@PathVariable("email") String email){
        if (passService.existsByEmail(email)) {
            passService.deleteByEmail(email);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
