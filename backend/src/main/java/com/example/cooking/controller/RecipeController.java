package com.example.cooking.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cooking.dto.RecipeDto;
import com.example.cooking.dto.RecipeResponseDto;
import com.example.cooking.dto.UserResponseDto;
import com.example.cooking.models.Recipe;
import com.example.cooking.models.User;
import com.example.cooking.service.RecipeService;

@RestController
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;


    @PostMapping("/recipes")
    public ResponseEntity<?> createRecipe(
            @RequestBody RecipeDto dto) {

        Recipe recipe =
                recipeService.createRecipe(dto);

        if (recipe != null) {

            return ResponseEntity.ok(
                    convertToDto(recipe)
            );

        }

        return ResponseEntity
                .status(404)
                .body("Chef not found");
    }


    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeResponseDto>>
            getAllRecipes() {

        List<RecipeResponseDto> recipes =
                recipeService
                    .getAllRecipes()
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }


    @GetMapping("/recipes/{id}")
    public ResponseEntity<?> getRecipeById(
            @PathVariable Long id) {

        Recipe recipe =
                recipeService.getRecipeById(id);

        if (recipe != null) {

            return ResponseEntity.ok(
                    convertToDto(recipe)
            );

        }

        return ResponseEntity
                .status(404)
                .body("Recipe not found");
    }


    /*
     * This endpoint increases the view count.
     */
    @PostMapping("/recipes/{id}/view")
    public ResponseEntity<?> increaseView(
            @PathVariable Long id) {

        Recipe recipe =
                recipeService.increaseView(id);

        if (recipe != null) {

            return ResponseEntity.ok(
                    convertToDto(recipe)
            );

        }

        return ResponseEntity
                .status(404)
                .body("Recipe not found");
    }


    @GetMapping("/users/{userId}/recipes")
    public ResponseEntity<List<RecipeResponseDto>>
            getUserRecipes(
                    @PathVariable Long userId) {

        List<RecipeResponseDto> recipes =
                recipeService
                    .getRecipesByChef(userId)
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());

        return ResponseEntity.ok(recipes);
    }


    @PutMapping("/recipes/{id}")
    public ResponseEntity<?> updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeDto dto) {

        Recipe recipe =
                recipeService.updateRecipe(id, dto);

        if (recipe != null) {

            return ResponseEntity.ok(
                    convertToDto(recipe)
            );

        }

        return ResponseEntity
                .status(404)
                .body("Recipe or chef not found");
    }


    @DeleteMapping("/recipes/{id}")
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


    private RecipeResponseDto convertToDto(
            Recipe recipe) {

        User chef = recipe.getChef();

        UserResponseDto chefDto = null;

        if (chef != null) {

            chefDto = new UserResponseDto(
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