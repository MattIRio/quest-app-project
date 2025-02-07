package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QuestRepository extends JpaRepository<QuestModel, UUID> {
    Optional<QuestModel> findById(UUID id);
    QuestModel findByEmail(String email);
}
