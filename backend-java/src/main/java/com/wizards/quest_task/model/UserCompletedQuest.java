package com.wizards.quest_task.model;

import jakarta.persistence.*;


import java.time.LocalDateTime;

@Entity
public class UserCompletedQuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "quest_id")
    private QuestModel quest;

    private LocalDateTime completionDate;

    private int score;

    private int ratedGrade;

}
