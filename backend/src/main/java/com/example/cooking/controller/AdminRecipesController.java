package com.example.cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminRecipesController {

    @GetMapping("/admin/recipes")
    public String adminRecipesPage() {
        return "admin-recipes";
    }
}