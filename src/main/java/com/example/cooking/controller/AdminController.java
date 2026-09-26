package com.example.cooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cooking.dto.AdminLoginDto;
import com.example.cooking.dto.AdminResponseDto;
import com.example.cooking.dto.DashboardDto;
import com.example.cooking.models.Admin;
import com.example.cooking.service.AdminService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    // Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AdminLoginDto loginDto,
            HttpSession session) {

        Admin admin = adminService.loginAdmin(
                loginDto.getEmail(),
                loginDto.getPassword()
        );

        if (admin != null) {

            // Store admin ID in the session
            session.setAttribute("adminId", admin.getId());

            AdminResponseDto response =
                    new AdminResponseDto(
                            admin.getId(),
                            admin.getName(),
                            admin.getEmail()
                    );

            return ResponseEntity.ok(response);
        }

        return ResponseEntity
                .status(401)
                .body("Invalid admin email or password");
    }


    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboardData()
        );
    }
}