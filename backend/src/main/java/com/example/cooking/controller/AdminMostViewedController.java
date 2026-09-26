package com.example.cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminMostViewedController {

    @GetMapping("/admin/most-viewed")
    public String adminMostViewedPage() {
        return "admin-most-viewed";
    }
}