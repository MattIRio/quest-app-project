package com.wizards.quest_task.controller.user;


import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    private ResponseEntity<UserModel> getCurrentUserData(Principal principal,
                                                         @AuthenticationPrincipal OAuth2User authentication){
        try {
            return ResponseEntity.ok(userService.getCurrentUser(principal, authentication));
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping
    private ResponseEntity<String> changeCurrentUserData(Principal principal,
                                                         @AuthenticationPrincipal OAuth2User authentication,
                                                         @RequestParam(required = false) MultipartFile avatar,
                                                         @RequestParam(required = false) String userName){
        try {
            userService.changeCurrentUserInfo(principal, authentication, userName, avatar);
            return ResponseEntity.ok("User data successfully changed");
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }






}
