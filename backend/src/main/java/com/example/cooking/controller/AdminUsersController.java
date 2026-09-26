package com.example.cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminUsersController {

    @GetMapping("/admin/users")
    public String adminUsersPage() {
        return "admin-users";
    }
}