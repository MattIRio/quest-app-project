package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.QuestTaskModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestTaskRepository extends JpaRepository<QuestTaskModel, UUID> {
    Optional<QuestTaskModel> findById(UUID id);
    void deleteAllByParentQuestId(UUID parentQuestId);
    List<QuestTaskModel> findAllByParentQuestId(UUID parentQuestId);
}
