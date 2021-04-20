package com.example.dhtrack.dhtrack.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "riderPasses",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "Name"),
                @UniqueConstraint(columnNames = "email"),
        })
public class RiderPass {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 600)
    private String skillClarification;

    @NotBlank
    @Size(max = 20)
    private String approvedForTrack;

    @NotBlank
    @Size(max = 20)
    private String skill;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public RiderPass() {
    }

    public RiderPass(String name, String email, String skillClarification, String approvedForTrack) {
        this.email = email;
        this.name = name;
        this.skillClarification = skillClarification;
        this.approvedForTrack = approvedForTrack;
    }


    public String getSkill() {
        return skill;
    }

    public RiderPass setSkill(String skill) {
        this.skill = skill;
        return this;
    }

    public String getName() {
        return name;
    }

    public RiderPass setName(String name) {
        this.name = name;
        return this;
    }

    public String getSkillClarification() {
        return skillClarification;
    }

    public RiderPass setSkillClarification(String skillClarification) {
        this.skillClarification = skillClarification;
        return this;
    }

    public Long getId() {
        return id;
    }

    public RiderPass setId(long id) {
        this.id = id;
        return this;
    }


    public String getEmail() {
        return email;
    }

    public RiderPass setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getApprovedForTrack() {
        return approvedForTrack;
    }

    public RiderPass setApprovedForTrack(String track) {
        this.approvedForTrack = track;
        return this;
    }

    @Override
    public String toString() {
        return "RiderPass{" +
                "id =" + id +
                ", name='" + name + '\'' +
                ", skill=" + skill +
                ", email=" + email +
                ", skillClarification=" + skillClarification +
                ", approvedForTrack=" + approvedForTrack +
                '}';
    }
}
