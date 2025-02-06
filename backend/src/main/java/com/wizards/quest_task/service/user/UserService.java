package com.wizards.quest_task.service.user;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    public ResponseEntity<String> createUser() {

        QuestService questService = new QuestService();
        questService.getsmth();

        return ResponseEntity.ok("gj dude");
        }
}
