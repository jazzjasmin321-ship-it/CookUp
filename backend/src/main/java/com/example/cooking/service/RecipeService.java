package com.example.cooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cooking.dto.RecipeDto;
import com.example.cooking.models.Recipe;
import com.example.cooking.models.User;
import com.example.cooking.repository.RecipeRepository;
import com.example.cooking.repository.UserRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;


    public Recipe createRecipe(RecipeDto dto) {

        User chef = userRepository
                .findById(dto.getChefId())
                .orElse(null);

        if (chef == null) {
            return null;
        }

        Recipe recipe = new Recipe();

        recipe.setName(dto.getName());
        recipe.setPicture(dto.getPicture());
        recipe.setIngredients(dto.getIngredients());
        recipe.setInstructions(dto.getInstructions());
        recipe.setTime(dto.getTime());
        recipe.setLevel(dto.getLevel());
        recipe.setChef(chef);

        return recipeRepository.save(recipe);
    }


    public List<Recipe> getAllRecipes() {

        return recipeRepository.findAll();

    }


    /*
     * Getting recipe details does NOT increase views.
     */
    public Recipe getRecipeById(Long id) {

        return recipeRepository
                .findById(id)
                .orElse(null);

    }


    /*
     * Increase recipe view count.
     */
    public Recipe increaseView(Long id) {

        Recipe recipe = recipeRepository
                .findById(id)
                .orElse(null);

        if (recipe == null) {
            return null;
        }

        recipe.setViews(
            recipe.getViews() + 1
        );

        return recipeRepository.save(recipe);

    }


    public List<Recipe> getRecipesByChef(Long chefId) {

        User chef = userRepository
                .findById(chefId)
                .orElse(null);

        if (chef == null) {
            return List.of();
        }

        return recipeRepository.findByChef(chef);

    }


    public Recipe updateRecipe(
            Long id,
            RecipeDto dto) {

        Recipe recipe = recipeRepository
                .findById(id)
                .orElse(null);

        if (recipe == null) {
            return null;
        }

        User chef = userRepository
                .findById(dto.getChefId())
                .orElse(null);

        if (chef == null) {
            return null;
        }

        recipe.setName(dto.getName());
        recipe.setPicture(dto.getPicture());
        recipe.setIngredients(dto.getIngredients());
        recipe.setInstructions(dto.getInstructions());
        recipe.setTime(dto.getTime());
        recipe.setLevel(dto.getLevel());
        recipe.setChef(chef);

        return recipeRepository.save(recipe);

    }


    public List<Recipe> getMostViewedRecipes() {

        return recipeRepository
                .findTop10ByOrderByViewsDesc();

    }


    public boolean deleteRecipe(Long id) {

        if (!recipeRepository.existsById(id)) {
            return false;
        }

        recipeRepository.deleteById(id);

        return true;

    }

}