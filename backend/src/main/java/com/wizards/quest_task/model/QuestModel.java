package com.wizards.quest_task.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity
public class QuestModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    private Integer amountOfQuestions;

    private Integer timeLimit;

    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private UserModel owner;

    @ManyToMany(mappedBy = "completedQuests")
    private List<UserModel> usersWhoCompleted;

    @OneToMany(mappedBy = "parentQuest", cascade = CascadeType.ALL)
    private List<QuestTaskModel> tasks;


}
