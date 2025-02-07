package com.wizards.quest_task.controller.questTask;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import com.wizards.quest_task.service.quest.QuestService;
import com.wizards.quest_task.service.questTask.QuestTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/quest")
public class QuestTaskController {

    @Autowired
    QuestTaskService questTaskService;

    private ResponseEntity<String> createQuestTasks(Principal principal,
                                                  @AuthenticationPrincipal OAuth2User authentication,
                                                  @RequestParam List<QuestTaskModel> questTaskModel,
                                                  @RequestParam UUID questID){
        try {
            for (QuestTaskModel currentTask : questTaskModel){
                questTaskService.createTask(principal, authentication, currentTask, questID);
            }
            return ResponseEntity.ok("Task were successfully created");
        }catch (Exception e){
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    private ResponseEntity<String> deleteQuest(Principal principal,
//                                             @AuthenticationPrincipal OAuth2User authentication,
//                                             @RequestParam UUID questId){
//        try {
//            questService.deleteQuest(principal, authentication, questId);
//            return ResponseEntity.ok("Quest deleted successfully");
//        }catch (Exception e){
//            System.out.println("Unexpected error: " + e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

}
