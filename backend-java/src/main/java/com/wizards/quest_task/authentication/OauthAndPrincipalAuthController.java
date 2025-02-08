package com.wizards.quest_task.authentication;

import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


import java.security.Principal;
@Service
public class OauthAndPrincipalAuthController {
    @Autowired
    UserRepository userRepository;

    public UserModel getCurrentUser(Principal principal, OAuth2User authentication) {
        if (principal instanceof OAuth2AuthenticationToken) {
            return userRepository.findByEmail((String) authentication.getAttributes().get("email"));
        } else if (principal instanceof UsernamePasswordAuthenticationToken) {
            return userRepository.findByEmail(principal.getName());
        }
        throw new IllegalArgumentException("Unknown authentication type");
    }
}
