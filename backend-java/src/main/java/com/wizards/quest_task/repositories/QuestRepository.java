package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.UserModel;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestRepository extends JpaRepository<QuestModel, UUID> {
    Optional<QuestModel> findById(UUID id);

    @Query("SELECT q FROM QuestModel q ORDER BY q.name")
    List<QuestModel> findAllOrderByName(PageRequest pageRequest);

    @Query("SELECT q FROM QuestModel q ORDER BY q.rating")
    List<QuestModel> findAllByOrderByRating(PageRequest pageRequest);

    @Query("SELECT q FROM QuestModel q ORDER BY q.creationDate")
    List<QuestModel> findAllByOrderByDate(PageRequest pageRequest);
}
