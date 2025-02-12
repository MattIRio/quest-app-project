package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.OngoingQuestModel;
import com.wizards.quest_task.model.QuestModel;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Transactional
public interface OngoingQuestRepository extends JpaRepository<OngoingQuestModel, UUID> {

    List<OngoingQuestModel> findByPerformerId(UUID performerId);

    @Transactional
    @Modifying
    @Query("DELETE FROM OngoingQuestModel oq WHERE oq.id = :id")
    void deleteById(@Param("id") UUID id);
}
