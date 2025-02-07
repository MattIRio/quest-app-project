package com.wizards.quest_task.service.user;


import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import com.wizards.quest_task.service.fileUpload.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;


@Service
public class UserService {
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FileUploadService fileUploadService;

    public UserModel getCurrentUser(Principal principal,
                                    @AuthenticationPrincipal OAuth2User authentication){
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        return currentUser;
    }

    public void changeCurrentUserInfo(Principal principal,
                                      @AuthenticationPrincipal OAuth2User authentication,
                                       String userName,
                                       MultipartFile avatar){
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        if (userName == null && avatar == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not data were send.");
        }
        if (userName != null){
            currentUser.setUserName(userName);
            userRepository.save(currentUser);
        }
        if (avatar != null){
            fileUploadService.uploadProfilePicture(avatar, principal, authentication);
        }

    }
}
