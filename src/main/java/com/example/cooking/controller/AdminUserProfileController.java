package com.example.cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminUserProfileController {

    @GetMapping("/admin/user-profile")
    public String adminUserProfilePage() {
        return "admin-user-profile";
    }
}