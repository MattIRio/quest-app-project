package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QuestTaskRepository extends JpaRepository<QuestTaskModel, UUID> {
    Optional<QuestTaskModel> findById(UUID id);
    QuestTaskModel findByEmail(String email);
}
