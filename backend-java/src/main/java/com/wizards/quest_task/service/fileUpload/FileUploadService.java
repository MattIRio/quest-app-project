package com.wizards.quest_task.service.fileUpload;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.QuestTaskModel;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.QuestTaskRepository;
import com.wizards.quest_task.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.UUID;

@Service
public class FileUploadService {
    @Autowired
    UserRepository usersRepository;
    @Autowired
    QuestTaskRepository questTaskRepository;
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;


    public static String uploadDirecotry = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";

    @Transactional
    public String uploadProfilePicture(MultipartFile file, Principal principal, @AuthenticationPrincipal OAuth2User authentication) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);

        try {
            byte[] fileBytes = file.getBytes();

            UserModel localUser = usersRepository.findByEmail(currentUser.getEmail());
            localUser.setAvatar(fileBytes);
            usersRepository.save(localUser);

        } catch (IOException e) {
            System.err.println("Failed to process file: " + file.getOriginalFilename());
            return null;
        }
        return file.getOriginalFilename();
    }

    @Transactional
    public byte[] uploadTaskPicture(MultipartFile file, Principal principal, @AuthenticationPrincipal OAuth2User authentication, UUID taskId) throws IOException {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        QuestTaskModel task = questTaskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        try {
            task.setPhotoForTask(file.getBytes());
        } catch (IOException e) {
            System.err.println("Failed to save task image: " + e.getMessage());
            return null;
        }
        return file.getBytes();
    }


}
