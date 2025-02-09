package com.wizards.quest_task.service.signup;

import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Service
public class SignUpService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

public void createUser(UserModel userModel, RedirectAttributes redirectAttributes) {
        if (userModel == null || userModel.getEmail() == null || userModel.getPassword() == null || userModel.getUserName() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid user data provided");
        }

        UserModel existingUser = userRepository.findByEmail(userModel.getEmail());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User with such email already exists");

        } else {
            UserModel localUser = new UserModel();
            localUser.setPassword(passwordEncoder.encode(userModel.getPassword()));
            localUser.setEmail(userModel.getEmail());
            localUser.setUserName(userModel.getUserName());
            localUser.setAvatar(null);
            userRepository.save(localUser);
        }
    }
}
