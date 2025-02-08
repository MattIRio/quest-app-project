package com.wizards.quest_task.securityConfig;



import com.wizards.quest_task.authentication.AuthenticationSuccessHandler;
import com.wizards.quest_task.authentication.CustomAuthenticationSuccessHandler;
import com.wizards.quest_task.authentication.MyUserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration{



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf
                            .disable()
//                      .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

                )
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .authorizeHttpRequests(registry -> {

                    registry.requestMatchers( "/**").permitAll();
                    registry.requestMatchers("/test").authenticated();
                    registry.anyRequest().permitAll();


                })
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/loginPage?logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer
                            .usernameParameter("email")
                            .successHandler(new CustomAuthenticationSuccessHandler())
                            .permitAll();

                })
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new AuthenticationSuccessHandler())
                        .loginPage("/loginPage")
                        .defaultSuccessUrl("/profileform", true)
                )
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService(MyUserDetailService myUserDetailService) {
        return myUserDetailService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(MyUserDetailService userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
