package com.wizards.quest_task.service.fileUpload;


import com.wizards.quest_task.authentication.OauthAndPrincipalAuthController;
import com.wizards.quest_task.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class VideoUploadService {
    @Autowired
    OauthAndPrincipalAuthController oauthAndPrincipalAuthController;

    private static final String UPLOAD_FOLDER = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";
    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(Set.of("webm", "flv", "avi", "mov", "wmv", "mp4"));


    private boolean allowedFile(String filename) {
        return filename.contains(".") && ALLOWED_EXTENSIONS.contains(filename.substring(filename.lastIndexOf('.') + 1).toLowerCase());
    }

    public String uploadFile(@RequestParam("file") MultipartFile file,
                             Principal principal,
                             @AuthenticationPrincipal OAuth2User authentication,
                             UUID taskId) {
        UserModel currentUser = oauthAndPrincipalAuthController.getCurrentUser(principal, authentication);

        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        if (allowedFile(file.getOriginalFilename())) {
            try {
                File destinationFile = new File(UPLOAD_FOLDER,  currentUser.getUserName() + "_" + file.getOriginalFilename());
                file.transferTo(destinationFile);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File upload failed");
            }
        }
        return UPLOAD_FOLDER + currentUser.getUserName() + "_" + file.getOriginalFilename();
    }

}
