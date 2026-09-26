package com.example.cooking.dto;

public class RecipeResponseDto {

    private Long id;
    private String name;
    private String picture;
    private String ingredients;
    private String instructions;
    private String time;
    private String level;
    private Long views;

    private UserResponseDto chef;

    public RecipeResponseDto() {
    }

    public RecipeResponseDto(
            Long id,
            String name,
            String picture,
            String ingredients,
            String instructions,
            String time,
            String level,
            Long views,
            UserResponseDto chef) {

        this.id = id;
        this.name = name;
        this.picture = picture;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.time = time;
        this.level = level;
        this.views = views;
        this.chef = chef;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public UserResponseDto getChef() {
        return chef;
    }

    public void setChef(UserResponseDto chef) {
        this.chef = chef;
    }
}