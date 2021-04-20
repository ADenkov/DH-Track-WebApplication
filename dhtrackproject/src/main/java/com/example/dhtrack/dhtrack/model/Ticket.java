package com.example.dhtrack.dhtrack.model;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;

@Entity(name="Tickets")
public class Ticket {

    @Id
    @Column(name = "ticket_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ticketId;

    @Column(nullable = false, length = 16)
    private String code; // ticket code
//    @Enumerated(EnumType.STRING)
//    private Set<Track> track; // to which track the lift takes the client
    @Column(nullable = false)
    private String Track;
    @Column(nullable = false, length = 10)
    private double price;
    @Column(nullable = false)
    private double duration;
    @Column(nullable = false)
    private String date;
    @Column(nullable = false)
    private String ageGroup;
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user;

    public Ticket () {

    }

    public double getPrice() {
        return price;
    }

    public Ticket setPrice(double price) {
        this.price = price;
        return this;
    }

    public String getCode() {
        return code;
    }

    public Ticket setCode(String code) {
        this.code = code;
        return this;
    }

    public String getTrack() {
        return Track;
    }

    public Ticket setTrack(String track) {
        this.Track = track;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Ticket setUser(User user) {
        this.user = user;
        return this;
    }

    public double getDuration() {
        return duration;
    }

    public Ticket setDuration(double duration) {
        this.duration = duration;
        return this;
    }

    public String getDate() {
        return date;
    }

    public Ticket setDate(String date) {
        this.date = date;
        return this;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public Ticket setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
        return this;
    }

    public long getTicketId() {
        return ticketId;
    }

    public Ticket setTicketId(long ticketId) {
        this.ticketId = ticketId;
        return this;
    }

    //    @Column(nullable = false, length = 30)
//    private Date dateForUse;
}
