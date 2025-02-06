package com.wizards.quest_task.repositories;


import com.wizards.quest_task.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<UserModel, String> {
    UserModel findById(Integer id);
    UserModel findByEmail(String email);


}
