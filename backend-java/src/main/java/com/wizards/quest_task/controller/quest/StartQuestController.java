package com.wizards.quest_task.controller.quest;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.*;
import com.wizards.quest_task.repositories.*;
import com.wizards.quest_task.service.quest.QuestService;
import com.wizards.quest_task.service.user.UserQuestTimer;
import com.wizards.quest_task.service.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.time.LocalDate;
import java.util.*;

@Controller
public class StartQuestController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    QuestRepository questRepository;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;
    @Autowired
    OngoingQuestRepository ongoingQuestRepository;
    @Autowired
    OngoingTaskRepository ongoingTaskRepository;
    @Autowired
    CompletedQuestsRepository completedQuestsRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    UserQuestTimer userQuestTimer;
    @Autowired
    QuestService questService;

    @PostMapping("/start-quest")
    public ResponseEntity<?> StartQuest(@RequestParam UUID questId,
                                                            Principal principal,
                                                            @RequestParam Long startedAt,
                                                            @AuthenticationPrincipal OAuth2User authentication) {

        if (questId == null) {
            return new ResponseEntity("NotFound", HttpStatus.NOT_FOUND);                   //INITIALLY CREATED IN PYTHON BY PYTHON PROGRAMMER, CONVERTED INTO JAVA AND UPDATED
        }

        QuestModel quest = questRepository.findById(questId)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found"));

        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);

        for (OngoingQuestModel ongoingQuest : currentUser.getOngoingQuests()){
            UserCompletedQuest completedQuest = userQuestTimer.checkIfAnyExpiredQuests(principal,authentication);
            if (completedQuest != null){
                completedQuest.setCondition("quest time is over");

                return ResponseEntity.ok(completedQuest);
            };

            UUID a = ongoingQuest.getPerformedQuest().getId();
            if (ongoingQuest.getPerformedQuest().getId().equals(questId)) {

                for (int i = 0; i < ongoingQuest.getOngoingTasks().size(); i++) {
                    if (ongoingQuest.getOngoingTasks().get(i).getRelatedTask().getPhotoForTask() != null) {
                        String base64Image = Base64.getEncoder().encodeToString(ongoingQuest.getOngoingTasks().get(i).getRelatedTask().getPhotoForTask());
                        ongoingQuest.getOngoingTasks().get(i).getRelatedTask().setAvatarBase64("data:image/png;base64," + base64Image);
                    }
                    ongoingQuest.setCondition("quest is already running");
                    return ResponseEntity.ok(ongoingQuest);
                }
            }
        }

        OngoingQuestModel ongoingQuest = new OngoingQuestModel(currentUser, quest, quest.getTimeLimit(), startedAt);
        List<OngoingTasks> currentOngoingTasksList = new ArrayList<>();
        ongoingQuestRepository.save(ongoingQuest);
        for (QuestTaskModel currentTask : quest.getTasks()) {
            OngoingTasks currentOngoingTasks = new OngoingTasks();
            currentOngoingTasks.setRelatedOngoingQuest(ongoingQuest);
            currentOngoingTasks.setRelatedTask(currentTask);
            currentOngoingTasks.setPerformerid(currentUser.getId());
            currentOngoingTasksList.add(currentOngoingTasks);

            ongoingTaskRepository.save(currentOngoingTasks);
        }

        ongoingQuest.setOngoingTasks(currentOngoingTasksList);

            for (int i = 0; i < ongoingQuest.getOngoingTasks().size(); i++) {
                if (ongoingQuest.getOngoingTasks().get(i).getRelatedTask().getPhotoForTask() != null) {
                String base64Image = Base64.getEncoder().encodeToString(ongoingQuest.getOngoingTasks().get(i).getRelatedTask().getPhotoForTask());
                ongoingQuest.getOngoingTasks().get(i).getRelatedTask().setAvatarBase64("data:image/png;base64," + base64Image);
            }
        }

        Map<OngoingQuestModel, String> response = new HashMap<>();
        ongoingQuest.setCondition("quest started");
        return ResponseEntity.ok(ongoingQuest);
    }

    @PutMapping("/task-completed")
    public ResponseEntity<String> CompleteTask(@RequestParam UUID taskId,
                                               @RequestParam boolean result,
                                               @RequestParam String receivedAnswer,
                                               Principal principal,
                                               @AuthenticationPrincipal OAuth2User authentication) {
        if (taskId == null) {
            return new ResponseEntity("NotFound", HttpStatus.NOT_FOUND);
        }

        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        OngoingTasks currentTask = ongoingTaskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        currentTask.setCompletionResult(result);
        currentTask.setReceivedAnswer(receivedAnswer);
        ongoingTaskRepository.save(currentTask);
        messagingTemplate.convertAndSend("/userpage/" + currentUser.getId(), currentTask.getRelatedOngoingQuest().getOngoingTasks());
        return ResponseEntity.ok("Task completed");
    }



    @PutMapping("/quest-completed")
    public ResponseEntity<String> CompleteQuest(@RequestParam UUID questId,
                                                Principal principal,
                                                    @RequestParam double userGrade,
                                                @AuthenticationPrincipal OAuth2User authentication) {
        if (questId == null) {
            return new ResponseEntity("NotFound", HttpStatus.NOT_FOUND);
        }

        OngoingQuestModel currentQuest = ongoingQuestRepository.findById(questId)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questId));
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);


        int amountOfQuestions = currentQuest.getOngoingTasks().size();
        int amountOfRightAnswers = 0;

        for (OngoingTasks currentTask : currentQuest.getOngoingTasks()) {
            if (currentTask.getCompletionResult() != null) {
                if (currentTask.getCompletionResult()) {
                    amountOfRightAnswers++;
                } else {
                    amountOfRightAnswers--;
                }
            }
        }
        if (amountOfRightAnswers < 0){
            amountOfRightAnswers = 0;
        }
        UserCompletedQuest completedQuest = new UserCompletedQuest();

        completedQuest.setQuest(currentQuest.getPerformedQuest());
        completedQuest.setCompletionDate(LocalDate.now());
        completedQuest.setUser(currentUser);
        completedQuest.setScore((double) (amountOfRightAnswers/amountOfQuestions*10));
        completedQuest.setRatedGrade(userGrade);

        completedQuestsRepository.save(completedQuest);
        ongoingQuestRepository.delete(currentQuest);
        questService.rateQuests(completedQuest.getQuest().getId());

        return ResponseEntity.ok("Task completed");
    }


}
