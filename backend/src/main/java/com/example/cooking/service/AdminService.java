package com.example.cooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.cooking.dto.DashboardDto;
import com.example.cooking.models.Admin;
import com.example.cooking.repository.AdminRepository;
import com.example.cooking.repository.RecipeRepository;
import com.example.cooking.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Admin Login
    public Admin loginAdmin(String email, String password) {

        Admin admin =
                adminRepository.findByEmail(email)
                .orElse(null);

        if (admin == null) {
            return null;
        }

        if (passwordEncoder.matches(
                password,
                admin.getPassword()
        )) {
            return admin;
        }

        return null;
    }


    // Total Users
    public long getTotalUsers() {

        return userRepository.count();

    }


    // Total Recipes
    public long getTotalRecipes() {

        return recipeRepository.count();

    }


    // Dashboard Data
    public DashboardDto getDashboardData() {

        long totalUsers =
                userRepository.count();

        long totalRecipes =
                recipeRepository.count();

        return new DashboardDto(
                totalUsers,
                totalRecipes
        );

    }
}