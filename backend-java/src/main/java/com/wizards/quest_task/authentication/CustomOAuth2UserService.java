package com.wizards.quest_task.authentication;


import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

import java.util.Map;

import static org.springframework.messaging.simp.SimpAttributesContextHolder.getAttributes;


@Component
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        Map<String,Object> wad = oAuth2User.getAttributes();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (userRepository.findByEmail(email) == null) {
            UserModel user = new UserModel();
            user.setEmail(email);
            user.setUserName(name);
            user.setPassword("Registered with OAuth2");
            userRepository.save(user);
        }

        return oAuth2User;
    }
}
