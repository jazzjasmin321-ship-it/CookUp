package com.example.cooking.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cooking.dto.ChangePasswordDto;
import com.example.cooking.dto.LoginDto;
import com.example.cooking.dto.UserResponseDto;
import com.example.cooking.models.User;
import com.example.cooking.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(convertToDto(savedUser));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {

        User user = userService.loginUser(
                loginDto.getEmail(),
                loginDto.getPassword()
        );

        if (user != null) {
            return ResponseEntity.ok(convertToDto(user));
        }

        return ResponseEntity
                .status(401)
                .body("Invalid email or password");
    }

    // GET ALL USERS
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {

        List<UserResponseDto> users = userService.getAllUsers()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    // GET USER PROFILE
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {

        User user = userService.findById(id);

        if (user != null) {
            return ResponseEntity.ok(convertToDto(user));
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // UPDATE PROFILE
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = userService.updateProfile(id, updatedUser);

        if (user != null) {
            return ResponseEntity.ok(convertToDto(user));
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // CHANGE PASSWORD
    @PutMapping("/users/{id}/password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordDto dto) {

        boolean changed = userService.changePassword(id, dto);

        if (changed) {
            return ResponseEntity.ok("Password changed successfully");
        }

        return ResponseEntity
                .status(400)
                .body("Current password is incorrect");
    }

    // BLOCK USER
    @PutMapping("/users/{id}/block")
    public ResponseEntity<?> blockUser(@PathVariable Long id) {

        User user = userService.blockUser(id);

        if (user != null) {
            return ResponseEntity.ok(convertToDto(user));
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // UNBLOCK USER
    @PutMapping("/users/{id}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable Long id) {

        User user = userService.unblockUser(id);

        if (user != null) {
            return ResponseEntity.ok(convertToDto(user));
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // DELETE USER
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        boolean deleted = userService.deleteUser(id);

        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // CONVERT USER TO SAFE DTO
    private UserResponseDto convertToDto(User user) {

        return new UserResponseDto(
                user.getId(),
                user.getFullname(),
                user.getEmail(),
                user.getBio(),
                user.getProfilePicture(),
                user.isBlocked()
        );
    }
}