package com.example.hastaneSistemi.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.hastaneSistemi.model.User;
import com.example.hastaneSistemi.service.UserService;

@Component
public class DefaultAdminInitializer implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        createUserIfNotExists("admin", "admin", "00000000000", "ADMIN");

        createUserIfNotExists("user", "user", "11111111111", "USER");
    }

    private void createUserIfNotExists(String username, String password, String tcKimlikNumarasi, String role) {
        User user = userService.findByUsername(username);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setTcKimlikNumarasi(tcKimlikNumarasi);
            user.setRole(role);
            userService.createUser(user, role);
        }
    }
}
