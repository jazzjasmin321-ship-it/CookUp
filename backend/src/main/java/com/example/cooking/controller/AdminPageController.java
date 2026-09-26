package com.example.cooking.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminPageController {

    @GetMapping("/admin/login")
    public String adminLoginPage() {
        return "admin-login";
    }

    @GetMapping("/admin/logout")
    public String adminLogout(HttpSession session) {

        // Destroy the admin session
        session.invalidate();

        // Go back to login page
        return "redirect:/admin/login";
    }
}