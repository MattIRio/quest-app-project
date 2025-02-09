package com.wizards.quest_task.service.fileUpload;

import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.QuestTaskRepository;
import com.wizards.quest_task.repositories.UserRepository;
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
        String fileName = file.getOriginalFilename();
        Path fileNameAndPath = Paths.get(uploadDirecotry, currentUser.getUserName() + "_" + fileName);
        try {
        if (currentUser.getAvatar() != null) {
            Path currentAvatar = Path.of(currentUser.getAvatar());
            if (currentAvatar != null) {
                Files.deleteIfExists(currentAvatar);
                currentUser.setAvatar(null);
            }
        }
        Files.write(fileNameAndPath, file.getBytes());
        UserModel localUser = usersRepository.findByEmail(currentUser.getEmail());
        localUser.setAvatar(uploadDirecotry + currentUser.getUserName() + "_" + fileName);
        usersRepository.save(localUser);

        }catch (IOException e) {
            System.err.println("Failed to delete file: " + fileNameAndPath);
        }
        return fileName;
    }

    @Transactional
    public String uploadTaskPicture(MultipartFile file, Principal principal, @AuthenticationPrincipal OAuth2User authentication, UUID taskId) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);
        String fileName = file.getOriginalFilename();
        Path fileNameAndPath = Paths.get(uploadDirecotry, currentUser.getUserName() + "_" + taskId + "_" + fileName);
        try {
            Files.write(fileNameAndPath, file.getBytes());

        }catch (IOException e) {
            System.err.println("Failed to delete file: " + fileNameAndPath);
        }
        return uploadDirecotry + currentUser.getUserName() + "_" + taskId + "_" + fileName;
    }


}
