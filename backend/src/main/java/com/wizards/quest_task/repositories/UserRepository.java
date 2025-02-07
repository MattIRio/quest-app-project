package com.wizards.quest_task.repositories;


import com.wizards.quest_task.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<UserModel, UUID> {
    Optional<UserModel> findById(UUID id);
    UserModel findByEmail(String email);


}
