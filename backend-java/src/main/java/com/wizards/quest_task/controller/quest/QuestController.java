package com.wizards.quest_task.controller.quest;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.repositories.CompletedQuestsRepository;
import com.wizards.quest_task.repositories.QuestRepository;
import com.wizards.quest_task.service.quest.QuestService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/quest")
public class QuestController {

    @Autowired
    QuestService questService;
    @Autowired
    QuestRepository questRepository;
    @Autowired
    CompletedQuestsRepository completedQuestsRepository;

    @PostMapping
    private ResponseEntity<UUID> createQuest(Principal principal,
                                             @AuthenticationPrincipal OAuth2User authentication,
                                             @RequestBody QuestModel questModel) {
        try {
            return questService.createQuest(principal, authentication, questModel);
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping
    private ResponseEntity<String> deleteQuest(Principal principal,
                                               @AuthenticationPrincipal OAuth2User authentication,
                                               @RequestParam UUID questId) {
        try {
            questService.deleteQuest(principal, authentication, questId);

            return ResponseEntity.ok("Quest deleted successfully");
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/quests")
    public ResponseEntity<List<QuestModel>> queryQuests(@RequestParam(required = false, defaultValue = "0") int page,
                                                        @RequestParam(required = false, defaultValue = "20") int size,
                                                        @RequestParam(defaultValue = "rating") String sort) {
        List<QuestModel> result;
        switch (sort) {
            case "name":
                result = questRepository.findAllOrderByName(PageRequest.of(page, size));                             //INITIALLY CREATED IN PYTHON BY PYTHON PROGRAMMER, CONVERTED INTO JAVA
                break;
            case "rating":
            default:
                result = questRepository.findAllByOrderByRating(PageRequest.of(page, size));
                break;
            case "date":
                result = questRepository.findAllByOrderByDate(PageRequest.of(page, size));
                break;
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping("/ratequests")
    public ResponseEntity<Double> rateQuests(@RequestParam UUID questId) {
        Double averageRating = completedQuestsRepository.findAverageRatingByQuestID(questId);
        double rounded = Math.round(averageRating * 10.0) / 10.0;
        QuestModel currentQuest = questRepository.findById(questId)
                .orElseThrow(() -> new EntityNotFoundException("Quest not found with id: " + questId));
        currentQuest.setRating(rounded);
        questRepository.save(currentQuest);
        return ResponseEntity.ok(rounded);
    }

}
