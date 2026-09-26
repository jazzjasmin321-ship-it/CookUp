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

@RestController
@RequestMapping("/api/admin/recipes")
public class AdminRecipeApiController {

    @Autowired
    private RecipeService recipeService;


    // Get all recipes
    @GetMapping
    public ResponseEntity<List<RecipeResponseDto>> getAllRecipes() {

        List<RecipeResponseDto> recipes =
                recipeService.getAllRecipes()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }


    // Get recipe by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipe(@PathVariable Long id) {

        Recipe recipe =
                recipeService.getRecipeById(id);

        if (recipe == null) {

            return ResponseEntity
                    .status(404)
                    .body("Recipe not found");
        }

        return ResponseEntity.ok(
                convertToDto(recipe)
        );
    }


    // Get most viewed recipes
    @GetMapping("/most-viewed")
    public ResponseEntity<List<RecipeResponseDto>> getMostViewedRecipes() {

        List<RecipeResponseDto> recipes =
                recipeService.getMostViewedRecipes()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }


    // Delete recipe
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(
            @PathVariable Long id) {

        boolean deleted =
                recipeService.deleteRecipe(id);

        if (deleted) {

            return ResponseEntity.ok(
                    "Recipe deleted successfully"
            );
        }

        return ResponseEntity
                .status(404)
                .body("Recipe not found");
    }


    // Convert Recipe to safe DTO
    private RecipeResponseDto convertToDto(
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