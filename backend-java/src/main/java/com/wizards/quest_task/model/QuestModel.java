package com.wizards.quest_task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.apache.logging.log4j.util.Lazy;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
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

    private LocalDate creationDate;

    @Column(nullable = true)
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private UserModel owner;

    @OneToMany(mappedBy = "quest", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserCompletedQuest> completedByUsers;

    @OneToMany(mappedBy = "parentQuest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuestTaskModel> tasks;

    @OneToMany(mappedBy = "performedQuest", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OngoingQuestModel> ongoingQuests;

}
