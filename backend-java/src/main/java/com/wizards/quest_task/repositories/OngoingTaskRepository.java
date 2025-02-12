package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.OngoingQuestModel;
import com.wizards.quest_task.model.OngoingTasks;
import com.wizards.quest_task.model.QuestTaskModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

@Transactional

public interface OngoingTaskRepository extends JpaRepository<OngoingTasks, UUID> {
    Optional<OngoingTasks> findById(UUID id);

    @Modifying
    @Query("DELETE FROM OngoingTasks o WHERE o.relatedOngoingQuest.id = :relatedOngoingQuest_id")
    void deleteByRelatedOngoingQuestId(@Param("relatedOngoingQuest_id") UUID relatedOngoingQuestId);
}
