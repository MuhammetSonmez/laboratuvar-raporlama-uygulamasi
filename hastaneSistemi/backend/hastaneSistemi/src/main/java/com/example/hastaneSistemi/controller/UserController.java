package com.example.hastaneSistemi.controller;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.hastaneSistemi.model.User;
import com.example.hastaneSistemi.service.UserService;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User registerRequest) {
        try {
            User existingUserByTC = userService.findByTcKimlikNumarasi(registerRequest.getTcKimlikNumarasi());
            if (existingUserByTC != null) {
                throw new RuntimeException("Bu TC kimlik numarasına sahip bir kullanıcı zaten mevcut.");
            }

            User existingUserByUsername = userService.findByUsername(registerRequest.getUsername());
            if (existingUserByUsername != null) {
                throw new RuntimeException("Bu kullanıcı adına sahip bir kullanıcı zaten mevcut.");
            }

            User newUser = new User(registerRequest.getUsername(), registerRequest.getPassword(), registerRequest.getTcKimlikNumarasi());
            User createdUser = userService.createUser(newUser, "USER");
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((e.getMessage()));
        }
    }

        
    
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            if ("ADMIN".equals(user.getRole())) {
                return ResponseEntity.ok("ADMIN");
            } else {
                return ResponseEntity.ok("USER");
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
