package com.wizards.quest_task.service.questTask;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.service.fileUpload.VideoUploadService;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.QuestRepository;
import com.wizards.quest_task.repositories.QuestTaskRepository;
import com.wizards.quest_task.service.fileUpload.FileUploadService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
public class QuestTaskService {

    @Autowired
    QuestTaskRepository taskRepository;
    @Autowired
    FileUploadService fileUploadService;
    @Autowired
    QuestRepository questRepository;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;
    @Autowired
    VideoUploadService videoUploadServiceService;

    @Transactional
    public void createTask(Principal principal,
                           OAuth2User authentication,
                           QuestTaskModel questTaskModel,
                           MultipartFile photo,
                           MultipartFile video,
                           UUID questID) throws IOException {

        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        QuestModel currentQuest = questRepository.findById(questID)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questID));
        if (currentQuest.getTasks() != null) {
            List<QuestTaskModel> existedTasks = taskRepository.findAllByParentQuestId(currentQuest.getId());
            for (QuestTaskModel task : existedTasks) {
                if (task.getPlaceInQuestQueue() == questTaskModel.getPlaceInQuestQueue()) {
                    if (task.getPhotoForTask() != null) {
                        Path currentPhoto = Path.of(task.getPhotoForTask());
                        Files.deleteIfExists(currentPhoto);
                    } else if (task.getVideoForTask() != null) {
                        Path currentVideo = Path.of(task.getVideoForTask());
                        Files.deleteIfExists(currentVideo);
                    }
                    taskRepository.delete(task);
                    break;
                }
            }
            if (questTaskModel != null) {
                QuestTaskModel currentTask = new QuestTaskModel();
                currentTask.setId(UUID.randomUUID());
                currentTask.setParentQuest(currentQuest);
                currentTask.setTaskDescription(questTaskModel.getTaskDescription());
                currentTask.setTaskType(questTaskModel.getTaskType());
                currentTask.setPlaceInQuestQueue(questTaskModel.getPlaceInQuestQueue());
                switch (questTaskModel.getTaskType()) {
                    case TEXT:
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                        currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                        currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                        currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                        break;
                    case IMAGE:
                        currentTask.setPhotoForTask(fileUploadService.uploadTaskPicture(photo, principal, authentication, currentTask.getId()));
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setFirstImageCoordinate(questTaskModel.getFirstImageCoordinate());
                        currentTask.setSecondImageCoordinate(questTaskModel.getSecondImageCoordinate());
                        break;
                    case IMAGEWITHTEXTANSWER:
                        currentTask.setPhotoForTask(fileUploadService.uploadTaskPicture(photo, principal, authentication, currentTask.getId()));
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                        currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                        currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                        currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                        break;
                    case VIDEO:
                        currentTask.setVideoForTask(videoUploadServiceService.uploadFile(video, principal, authentication, currentTask.getId()));
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setAnswerVariation1(questTaskModel.getAnswerVariation1());
                        currentTask.setAnswerVariation2(questTaskModel.getAnswerVariation2());
                        currentTask.setAnswerVariation3(questTaskModel.getAnswerVariation3());
                        currentTask.setAnswerVariation4(questTaskModel.getAnswerVariation4());
                        break;
                    case TEXTWITHFREEANSWER:
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
                        break;
                    case IMAGEWITHFREEANSWER:
                        currentTask.setPhotoForTask(fileUploadService.uploadTaskPicture(photo, principal, authentication, currentTask.getId()));
                        currentTask.setQuestionForTask(questTaskModel.getQuestionForTask());
                        currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
                        break;
                    case VIDEOWITHFREEANSWER:
                        currentTask.setVideoForTask(videoUploadServiceService.uploadFile(video, principal, authentication, currentTask.getId()));
                        currentTask.setExpectedAnswerForFreeQuestion(questTaskModel.getExpectedAnswerForFreeQuestion());
                        break;
                }

                taskRepository.save(currentTask);
            }
        }
    }
}
