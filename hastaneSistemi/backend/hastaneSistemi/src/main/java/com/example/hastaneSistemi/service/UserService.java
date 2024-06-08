package com.example.hastaneSistemi.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hastaneSistemi.model.User;
import com.example.hastaneSistemi.repository.UserRepository;


@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    
    public User createUser(User user, String role) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Bu kullanıcı adı zaten kullanımda.");
        }
        if (userRepository.findByTcKimlikNumarasi(user.getTcKimlikNumarasi()) != null) {
            throw new RuntimeException("Bu TC kimlik numarası zaten kullanımda.");
        }
        user.setRole(role);
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public User findByTcKimlikNumarasi(String tcKimlikNumarasi){
        return userRepository.findByTcKimlikNumarasi(tcKimlikNumarasi);
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }    
    
}

