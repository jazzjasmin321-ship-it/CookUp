package com.example.cooking.dto;

public class DashboardDto {

    private long totalUsers;
    private long totalRecipes;

    public DashboardDto() {
    }

    public DashboardDto(long totalUsers, long totalRecipes) {
        this.totalUsers = totalUsers;
        this.totalRecipes = totalRecipes;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalRecipes() {
        return totalRecipes;
    }

    public void setTotalRecipes(long totalRecipes) {
        this.totalRecipes = totalRecipes;
    }
}