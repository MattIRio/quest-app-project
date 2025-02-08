package com.wizards.quest_task.controller.questTask;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import com.wizards.quest_task.service.quest.QuestService;
import com.wizards.quest_task.service.questTask.QuestTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/task")
public class QuestTaskController {

    @Autowired
    QuestTaskService questTaskService;

    @PostMapping("/create-task")
    private ResponseEntity<String> createQuestTasks(Principal principal,
                                                    @AuthenticationPrincipal OAuth2User authentication,
                                                    @RequestParam String questTaskModel,
                                                    @RequestParam(required = false) MultipartFile photo,
                                                    @RequestParam UUID questID) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            QuestTaskModel task = objectMapper.readValue(questTaskModel, new TypeReference<QuestTaskModel>() {});


                questTaskService.createTask(principal, authentication, task, photo, questID);

            return ResponseEntity.ok("Task were successfully created");
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
