package com.wizards.quest_task.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
public class QuestModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    private int amountOfQuestions;

    private int timeLimit;

    private int rating;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private UserModel owner;

    @ManyToMany(mappedBy = "completedQuests")
    private List<UserModel> usersWhoCompleted;

    @OneToMany(mappedBy = "parentQuest", cascade = CascadeType.ALL)
    private List<QuestTask> tasks;


}
