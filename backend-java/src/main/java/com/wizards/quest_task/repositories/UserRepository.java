package com.wizards.quest_task.repositories;


import com.wizards.quest_task.model.UserModel;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<UserModel, UUID> {
    Optional<UserModel> findById(UUID id);
    UserModel findByEmail(String email);

    @Query("SELECT u FROM UserModel u WHERE LOWER(u.userName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<UserModel> findByName(@Param("name")String name, PageRequest pageRequest);
}
