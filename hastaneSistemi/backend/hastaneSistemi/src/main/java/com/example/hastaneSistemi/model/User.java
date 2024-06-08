package com.example.hastaneSistemi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "tc_kimlik_numarasi", unique = true)
    private String tcKimlikNumarasi;

    @Column(name = "role")
    private String role;

    public User(String username, String password, String tcKimlikNumarasi) {
        this.username = username;
        this.password = password;
        this.tcKimlikNumarasi = tcKimlikNumarasi;
        this.role = "USER";
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTcKimlikNumarasi() {
        return tcKimlikNumarasi;
    }

    public void setTcKimlikNumarasi(String tcKimlikNumarasi) {
        this.tcKimlikNumarasi = tcKimlikNumarasi;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
