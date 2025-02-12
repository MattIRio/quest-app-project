package com.wizards.quest_task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OngoingTasks {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private UUID performerid;

    @ManyToOne
    @JoinColumn(name = "relatedOngoingQuest_id")
    @JsonIgnore
    private OngoingQuestModel relatedOngoingQuest;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "relatedTask_id")
    private QuestTaskModel relatedTask;

    private Boolean completionResult;

    private String receivedAnswer;

}
