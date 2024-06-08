package com.example.hastaneSistemi;


import com.example.hastaneSistemi.model.User;
import com.example.hastaneSistemi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import com.example.hastaneSistemi.controller.UserController;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister_Success() {
        User registerRequest = new User("username", "password", "12345678901");
        when(userService.findByTcKimlikNumarasi(registerRequest.getTcKimlikNumarasi())).thenReturn(null);
        when(userService.findByUsername(registerRequest.getUsername())).thenReturn(null);
        when(userService.createUser(registerRequest, "USER")).thenReturn(registerRequest);

        ResponseEntity<?> response = userController.register(registerRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testRegister_DuplicateTcKimlikNumarasi_BadRequest() {
        User registerRequest = new User("username", "password", "12345678901");
        when(userService.findByTcKimlikNumarasi(registerRequest.getTcKimlikNumarasi())).thenReturn(registerRequest);

        ResponseEntity<?> response = userController.register(registerRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Bu TC kimlik numarasına sahip bir kullanıcı zaten mevcut.", response.getBody());
    }

    @Test
    public void testRegister_DuplicateUsername_BadRequest() {
        User registerRequest = new User("username", "password", "12345678901");
        when(userService.findByTcKimlikNumarasi(registerRequest.getTcKimlikNumarasi())).thenReturn(null);
        when(userService.findByUsername(registerRequest.getUsername())).thenReturn(registerRequest);

        ResponseEntity<?> response = userController.register(registerRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Bu kullanıcı adına sahip bir kullanıcı zaten mevcut.", response.getBody());
    }


    @Test
    public void testGetAllUsers() {
        List<User> userList = new ArrayList<>();
        userList.add(new User("user1", "password1", "12345678901"));
        userList.add(new User("user2", "password2", "12345678902"));
        when(userService.getAllUsers()).thenReturn(userList);

        List<User> result = userController.getAllUsers();

        assertEquals(2, result.size());
    }
}
