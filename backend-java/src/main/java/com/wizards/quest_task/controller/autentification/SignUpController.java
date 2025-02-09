package com.wizards.quest_task.controller.autentification;



import com.wizards.quest_task.model.UserModel;
import com.wizards.quest_task.repositories.UserRepository;
import com.wizards.quest_task.service.signup.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class SignUpController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final SignUpService signUpService;

    public SignUpController(SignUpService signUpService) {
        this.signUpService = signUpService;
    }

    @GetMapping("/signUpPage")
        public String signUpPage() {                            //url to sign up page
            return "signup";
        }

    @PostMapping("/signUpUser")
    public String createUser(@RequestBody UserModel userModel, RedirectAttributes redirectAttributes) {
        try {
            signUpService.createUser(userModel, redirectAttributes);
            return "redirect:/loginPage";
        }catch (ResponseStatusException e) {
            System.out.println("Unexpected error: " + e);
            ResponseEntity.status(e.getStatusCode()).body(e.getReason()).getBody();
            return "redirect:/signUpPage";
        }
    }

    }
