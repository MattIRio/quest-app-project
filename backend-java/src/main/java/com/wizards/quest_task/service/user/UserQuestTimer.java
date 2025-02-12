package com.wizards.quest_task.service.user;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.OngoingQuestModel;
import com.wizards.quest_task.model.OngoingTasks;
import com.wizards.quest_task.model.UserCompletedQuest;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.*;
import com.wizards.quest_task.service.fileUpload.FileUploadService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;


@Service
public class UserQuestTimer {

    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FileUploadService fileUploadService;
    @Autowired
    QuestRepository questRepository;
    @Autowired
    CompletedQuestsRepository completedQuestsRepository;
    @Autowired
    OngoingQuestRepository ongoingQuestRepository;
    @Autowired
    OngoingTaskRepository ongoingTaskRepository;

    @Transactional
    public UserCompletedQuest checkIfAnyExpiredQuests(Principal principal,
                                             @AuthenticationPrincipal OAuth2User authentication) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        UserCompletedQuest result = new UserCompletedQuest();
        for (OngoingQuestModel ongoingQuest : currentUser.getOngoingQuests()) {
           Long time = System.currentTimeMillis();
            if (ongoingQuest.getStartedAt() + ongoingQuest.getTimeLimit()*100 <= System.currentTimeMillis()) {
                UserCompletedQuest completedQuest = new UserCompletedQuest();
                int amountOfQuestions = ongoingQuest.getOngoingTasks().size();
                int amountOfRightAnswers = 0;

                for (OngoingTasks currentTask : ongoingQuest.getOngoingTasks()) {
                    if (currentTask.getCompletionResult() != null) {

                        if (currentTask.getCompletionResult()) {
                            amountOfRightAnswers++;
                        } else {
                            amountOfRightAnswers--;
                        }
                    }
                }

                completedQuest.setQuest(ongoingQuest.getPerformedQuest());
                completedQuest.setCompletionDate(LocalDate.now());
                completedQuest.setUser(currentUser);
                if (amountOfQuestions < 1){
                    amountOfQuestions = 1;
                }

                completedQuest.setScore((double) (amountOfRightAnswers / amountOfQuestions * 10));
                completedQuest.setRatedGrade(null);

                ongoingTaskRepository.deleteByRelatedOngoingQuestId(ongoingQuest.getId());
                ongoingQuestRepository.deleteById(ongoingQuest.getId());
                completedQuestsRepository.save(completedQuest);
                result = completedQuest;
            } else {
                result = null;
            }
        }
        return result;
    }
}
