package com.wizards.quest_task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OngoingQuestModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Transient
    private String condition;

    @ManyToOne
    @JoinColumn(name = "performer_id")
    @JsonIgnore
    private UserModel performer;

    @ManyToOne
    @JoinColumn(name = "performedQuest_id")
    private QuestModel performedQuest;

    @OneToMany(mappedBy = "relatedOngoingQuest", cascade = CascadeType.ALL)
    private List<OngoingTasks> ongoingTasks;

    private Double userGrade;

    private Double taskRate;

    private Integer timeLimit;

    private Long startedAt;

    public OngoingQuestModel(UserModel performer, QuestModel performedQuest, Integer timeLimit, Long startedAt) {
        this.performer = performer;
        this.performedQuest = performedQuest;
        this.timeLimit = timeLimit;
        this.startedAt = startedAt;
    }
}
