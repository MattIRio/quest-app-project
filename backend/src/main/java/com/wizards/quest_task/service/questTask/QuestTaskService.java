package com.wizards.quest_task.service.questTask;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.QuestRepository;
import com.wizards.quest_task.repositories.QuestTaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.UUID;

@Service
public class QuestTaskService {

    @Autowired
    QuestTaskRepository taskRepository;
    @Autowired
    QuestRepository questRepository;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;

    public void createTask(Principal principal,
                           OAuth2User authentication,
                           QuestTaskModel questTaskModel,
                           UUID questID) {

        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        QuestModel currentQuest = questRepository.findById(questID)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questID));
        if (questTaskModel != null) {
            QuestTaskModel currentTask = new QuestTaskModel();
            currentTask.setParentQuest(currentQuest);
            currentTask.setTaskDescription(questTaskModel.getTaskDescription());
            currentTask.setTaskType(questTaskModel.getTaskType());
            switch (questTaskModel.getTaskType()) {
                case TEXT:
                    currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                    currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                    currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                    currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                    currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                case IMAGE:
                    currentTask.setPhotoForTask(questTaskModel.getPhotoForTask());
                    currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                    currentTask.setFirstImageCoordinate(questTaskModel.getFirstImageCoordinate());
                    currentTask.setSecondImageCoordinate(questTaskModel.getSecondImageCoordinate());
                case IMAGEWITHTEXTANSWER:
                    currentTask.setPhotoForTask(questTaskModel.getPhotoForTask());
                    currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                    currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                    currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                    currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                    currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                case VIDEO:
                    currentTask.setVideoForTask(questTaskModel.getVideoForTask());
                    currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                    currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                    currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                    currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                    currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                case TEXTWITHFREEANSWER:
                    currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                    currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
                case IMAGEWITHFREEANSWER:
                    currentTask.setPhotoForTask(questTaskModel.getPhotoForTask());
                    currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
                case VIDEOWITHFREEANSWER:
                    currentTask.setVideoForTask(questTaskModel.getVideoForTask());
                    currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
            }

            taskRepository.save(currentTask);
        }
    }

    public void deleteQuest(Principal principal,
                            OAuth2User authentication,
                            UUID questId) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        QuestModel currentQuest = questRepository.findById(questId)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questId));

        if (questId != null && currentQuest.getOwner() == currentUser) {
            questRepository.delete(currentQuest);
        }
    }


}
