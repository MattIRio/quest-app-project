package com.wizards.quest_task.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.nio.file.Path;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String userName;

    private String password;

    private String email;

    @Column(columnDefinition = "BYTEA")
    private byte[] avatar;

    @Transient
    private byte[] setAvatarBase64;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserCompletedQuest> completedQuests;


    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuestModel> createdQuests;

    @OneToMany(mappedBy = "performer", cascade = CascadeType.ALL)
    private List<OngoingQuestModel> ongoingQuests;

    private int createdQuestsRating;

    public void setAvatarBase64(String s) {
    }
}
