package com.wizards.quest_task.repositories;

import com.wizards.quest_task.model.UserCompletedQuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CompletedQuestsRepository extends JpaRepository<UserCompletedQuest, UUID> {

    @Query("SELECT AVG(q.ratedGrade) FROM UserCompletedQuest q WHERE q.quest.id = :questID")
    Double findAverageRatingByQuestID(@Param("questID")UUID questID);
}
