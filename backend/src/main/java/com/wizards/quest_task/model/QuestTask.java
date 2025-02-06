package com.wizards.quest_task.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
public class QuestTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String taskDescription;

    private String textForTask;

    private String PhotoForTask;

    private String VideoForTask;

    private String answerVariation1;

    private String answerVariation2;

    private String answerVariation3;

    private String answerVariation4;

    @ManyToOne
    @JoinColumn(name = "quest_id")
    private QuestModel parentQuest;

    private int placeInQuestQueue;

}
