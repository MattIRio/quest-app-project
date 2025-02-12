package com.wizards.quest_task.controller.user;


import com.wizards.quest_task.model.DTO.UserModelDTO;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import com.wizards.quest_task.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;


        @GetMapping("/get-data")
    private ResponseEntity<UserModel> getCurrentUserData(Principal principal,
                                                         @AuthenticationPrincipal OAuth2User authentication){
        try {
            return ResponseEntity.ok(userService.getCurrentUser(principal, authentication));
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/get-data-by-id")
    private ResponseEntity<Optional<UserModel>> getCurrentUserData(@RequestParam UUID userId){

            return ResponseEntity.ok(userRepository.findById(userId));
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

    @GetMapping("/get-created-quests")
    private ResponseEntity<List<QuestModel>> getCurrentUserCreatedQuests(Principal principal,
                                                                                  @AuthenticationPrincipal OAuth2User authentication){
        try {
            return ResponseEntity.ok(userService.getCurrentUserCreatedQuests(principal, authentication));
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/get-completed-quests")
    private ResponseEntity<List<QuestModel>> getCurrentUserCompletedQuests(Principal principal,
                                                                         @AuthenticationPrincipal OAuth2User authentication){
        try {
            return ResponseEntity.ok(userService.getCurrentUserCompletedQuests(principal, authentication));
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/get-users")
    public ResponseEntity<List<UserModelDTO>> queryQuests(Principal principal,
                                                        @AuthenticationPrincipal OAuth2User authentication,
                                                        @RequestParam(required = false, defaultValue = "0") int page,
                                                        @RequestParam(required = false, defaultValue = "20") int size,
                                                        @RequestParam(required = false) String nameToSearch) {

        List<UserModel> users = userRepository.findByName(nameToSearch, PageRequest.of(page, size));
        List<UserModelDTO> dtoUsers = users.stream().map(user -> new UserModelDTO(user.getId(), user.getUserName(), user.getAvatar(), user.getCreatedQuestsRating()))
                .collect(Collectors.toList());;
        return ResponseEntity.ok(dtoUsers);
    }






}
