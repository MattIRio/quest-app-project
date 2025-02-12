package com.wizards.quest_task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Enumerated(EnumType.STRING)
    private TaskType taskType;

    private String taskDescription;

    private String questionForTask;

    @Column(columnDefinition = "BYTEA")
    private byte[] PhotoForTask;

    @Transient
    private byte[] setAvatarBase64;

    private String VideoForTask;

    private String answerVariation1;

    private String answerVariation2;

    private String answerVariation3;

    private String answerVariation4;

    private Integer firstXImageCoordinate;

    private Integer firstYImageCoordinate;

    private Integer secondXImageCoordinate;

    private Integer secondYImageCoordinate;

    private String expectedAnswer;

    private String receivedAnswer;

    @ManyToOne
    @JoinColumn(name = "quest_id")
    @JsonIgnore
    private QuestModel parentQuest;

    private int placeInQuestQueue;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "relatedOngoingTask_id")
    @JsonIgnore
    private OngoingTasks relatedOngoingTask;

    public void setAvatarBase64(String s) {
    }

}
