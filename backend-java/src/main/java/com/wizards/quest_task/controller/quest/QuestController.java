package com.wizards.quest_task.controller.quest;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.service.quest.QuestService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/quest")
public class QuestController {

    @Autowired
    QuestService questService;

    @PostMapping
    private ResponseEntity<UUID> createQuest(Principal principal,
                                             @AuthenticationPrincipal OAuth2User authentication,
                                             @RequestBody QuestModel questModel) {
        try {
            return questService.createQuest(principal, authentication, questModel);
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping
    private ResponseEntity<String> deleteQuest(Principal principal,
                                               @AuthenticationPrincipal OAuth2User authentication,
                                               @RequestParam UUID questId) {
        try {
            questService.deleteQuest(principal, authentication, questId);

            return ResponseEntity.ok("Quest deleted successfully");
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
