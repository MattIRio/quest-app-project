package com.wizards.quest_task.service.user;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestService {

    public ResponseEntity<String> getsmth() {
        return ResponseEntity.ok("gj dude");
        }
}
