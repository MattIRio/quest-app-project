package com.wizards.quest_task.model;

import jakarta.persistence.*;
import lombok.*;
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

    private LocalDate creationDate = LocalDate.now();

    @Column(nullable = true)
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private UserModel owner;

    @OneToMany(mappedBy = "quest", cascade = CascadeType.ALL)
    private List<UserCompletedQuest> completedByUsers;

    @OneToMany(mappedBy = "parentQuest", cascade = CascadeType.ALL)
    private List<QuestTaskModel> tasks;


}
