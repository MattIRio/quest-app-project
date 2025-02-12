package com.wizards.quest_task.model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wizards.quest_task.model.OngoingQuestModel;
import com.wizards.quest_task.model.QuestModel;
import com.wizards.quest_task.model.UserCompletedQuest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserModelDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String userName;

    private byte[] avatar;

    private int createdQuestsRating;
}
