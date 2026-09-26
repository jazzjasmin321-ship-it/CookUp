package com.example.cooking.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cooking.dto.RecipeResponseDto;
import com.example.cooking.dto.UserResponseDto;
import com.example.cooking.models.Recipe;
import com.example.cooking.models.User;
import com.example.cooking.service.RecipeService;
import com.example.cooking.service.UserService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {

        List<UserResponseDto> users =
                userService.getAllUsers()
                .stream()
                .map(this::convertUserToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    // Get one user profile
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable Long id) {

        User user =
                userService.findById(id);

        if (user == null) {
            return ResponseEntity
                    .status(404)
                    .body("User not found");
        }

        return ResponseEntity.ok(
                convertUserToDto(user)
        );
    }

    // Get recipes created by user
    @GetMapping("/{id}/recipes")
    public ResponseEntity<List<RecipeResponseDto>> getUserRecipes(
            @PathVariable Long id) {

        List<RecipeResponseDto> recipes =
                recipeService.getRecipesByChef(id)
                .stream()
                .map(this::convertRecipeToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }

    // Block user
    @PutMapping("/{id}/block")
    public ResponseEntity<?> blockUser(
            @PathVariable Long id) {

        User user =
                userService.blockUser(id);

        if (user == null) {
            return ResponseEntity
                    .status(404)
                    .body("User not found");
        }

        return ResponseEntity.ok(
                convertUserToDto(user)
        );
    }

    // Unblock user
    @PutMapping("/{id}/unblock")
    public ResponseEntity<?> unblockUser(
            @PathVariable Long id) {

        User user =
                userService.unblockUser(id);

        if (user == null) {
            return ResponseEntity
                    .status(404)
                    .body("User not found");
        }

        return ResponseEntity.ok(
                convertUserToDto(user)
        );
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        boolean deleted =
                userService.deleteUser(id);

        if (deleted) {
            return ResponseEntity.ok(
                    "User deleted successfully"
            );
        }

        return ResponseEntity
                .status(404)
                .body("User not found");
    }

    // Convert User to safe DTO
    private UserResponseDto convertUserToDto(
            User user) {

        return new UserResponseDto(
                user.getId(),
                user.getFullname(),
                user.getEmail(),
                user.getBio(),
                user.getProfilePicture(),
                user.isBlocked()
        );
    }

    // Convert Recipe to safe DTO
    private RecipeResponseDto convertRecipeToDto(
            Recipe recipe) {

        User chef =
                recipe.getChef();

        UserResponseDto chefDto = null;

        if (chef != null) {

            chefDto =
                    new UserResponseDto(
                            chef.getId(),
                            chef.getFullname(),
                            chef.getEmail(),
                            chef.getBio(),
                            chef.getProfilePicture(),
                            chef.isBlocked()
                    );
        }

        return new RecipeResponseDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getPicture(),
                recipe.getIngredients(),
                recipe.getInstructions(),
                recipe.getTime(),
                recipe.getLevel(),
                recipe.getViews(),
                chefDto
        );
    }
}