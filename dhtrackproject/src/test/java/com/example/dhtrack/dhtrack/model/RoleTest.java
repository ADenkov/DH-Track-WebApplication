package com.example.dhtrack.dhtrack.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoleTest {
    Role sampleRole;
    @BeforeEach
    void setUp() {
        sampleRole = new Role(ERole.ROLE_MANAGER);
        sampleRole.setId(0);
    }

    @Test
    void getId() {
        assertEquals(0, sampleRole.getId());
    }

    @Test
    void setId() {
        sampleRole.setId(6);
        assertEquals(6, sampleRole.getId());
    }

    @Test
    void getName() {
        assertEquals(ERole.ROLE_MANAGER, sampleRole.getName());
    }

    @Test
    void setName() {
        sampleRole.setName(ERole.ROLE_USER);
        assertEquals(ERole.ROLE_USER, sampleRole.getName());
    }
}