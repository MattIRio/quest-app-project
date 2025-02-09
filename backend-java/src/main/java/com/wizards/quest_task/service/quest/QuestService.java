package com.wizards.quest_task.service.quest;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.QuestRepository;
import com.wizards.quest_task.repositories.QuestTaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuestService {

    @Autowired
    QuestRepository questRepository;
    @Autowired
    QuestTaskRepository questTaskRepository;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;

    public ResponseEntity<UUID> createQuest(Principal principal,
                                       OAuth2User authentication,
                                       QuestModel questModel) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        UUID currentQuestId = null;
        if (questModel != null) {
            QuestModel currentQuest = QuestModel.builder()
                    .owner(currentUser)
                    .name(questModel.getName())
                    .amountOfQuestions(questModel.getAmountOfQuestions())
                    .description(questModel.getDescription())
                    .timeLimit(questModel.getTimeLimit())
                    .build();
            questRepository.save(currentQuest);
            currentQuestId = currentQuest.getId();
        }
        return ResponseEntity.ok(currentQuestId);
    }

    @Transactional
    public void deleteQuest(Principal principal,
                             OAuth2User authentication,
                             UUID questId) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        QuestModel currentQuest = questRepository.findById(questId)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questId));

        if (questId != null && currentQuest.getOwner() == currentUser) {
            questTaskRepository.deleteAllByParentQuestId(questId);
            questRepository.delete(currentQuest);
        }
    }


}
