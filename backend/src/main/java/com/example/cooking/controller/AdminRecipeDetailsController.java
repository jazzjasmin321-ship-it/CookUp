package com.example.cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminRecipeDetailsController {

    @GetMapping("/admin/recipe-details")
    public String adminRecipeDetailsPage() {
        return "admin-recipe-details";
    }
}