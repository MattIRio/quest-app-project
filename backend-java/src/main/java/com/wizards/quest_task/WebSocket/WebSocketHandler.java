package com.wizards.quest_task.WebSocket;


import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;

import com.wizards.quest_task.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;
import java.util.UUID;

@Controller
public class WebSocketHandler {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;

    @PostMapping("/accepted")
    public void handleAccepted(Principal principal,
                               @AuthenticationPrincipal OAuth2User authentication) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        messagingTemplate.convertAndSend("/userpage/" + currentUser.getId(), currentUser);
    }

}