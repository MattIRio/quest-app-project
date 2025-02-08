package com.wizards.quest_task.model;

import com.wizards.quest_task.model.ENUM.TaskType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
public class QuestTaskModel {

    @Id
    private UUID id;

    private TaskType taskType;

    private String taskDescription;

    private String questionForTask;

    private String PhotoForTask;

    private String VideoForTask;

    private String answerVariation1;

    private String answerVariation2;

    private String answerVariation3;

    private String answerVariation4;

    private Integer firstImageCoordinate;

    private Integer secondImageCoordinate;

    private String expectedAnswerForFreeQuestion;

    @ManyToOne
    @JoinColumn(name = "quest_id")
    private QuestModel parentQuest;

    private int placeInQuestQueue;

}
