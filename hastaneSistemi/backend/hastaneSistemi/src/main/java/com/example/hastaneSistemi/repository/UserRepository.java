package com.example.hastaneSistemi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hastaneSistemi.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByTcKimlikNumarasi(String tcKimlikNumarasi);
}
