package com.wizards.quest_task;

import com.wizards.quest_task.service.fileUpload.FileUploadService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class QuestTaskApplication {

	public static void main(String[] args) {
		new File(FileUploadService.uploadDirecotry).mkdir();
		SpringApplication.run(QuestTaskApplication.class, args);
	}

}
