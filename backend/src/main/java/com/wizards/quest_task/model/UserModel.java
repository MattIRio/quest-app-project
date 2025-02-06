package com.wizards.quest_task.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.nio.file.Path;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Entity
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String userName;

    private String password;

    private String email;

    private String avatar;

    private String profilePicture;

    @ManyToMany
    @JoinTable(
            name = "user_completed_quests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "quest_id"))
    private List<QuestModel> completedQuests;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<QuestModel> createdQuests;

    private int createdQuestsRating;
}
