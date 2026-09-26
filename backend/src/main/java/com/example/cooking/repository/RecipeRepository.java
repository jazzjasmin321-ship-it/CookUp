package com.example.cooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cooking.models.Recipe;
import com.example.cooking.models.User;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByChef(User chef);

    List<Recipe> findTop10ByOrderByViewsDesc();

}