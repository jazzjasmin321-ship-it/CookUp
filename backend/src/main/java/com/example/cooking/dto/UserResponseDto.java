package com.example.cooking.dto;

public class UserResponseDto {

    private Long id;
    private String fullname;
    private String email;
    private String bio;
    private String profilePicture;
    private boolean blocked;

    public UserResponseDto() {
    }

    public UserResponseDto(
            Long id,
            String fullname,
            String email,
            String bio,
            String profilePicture,
            boolean blocked) {

        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.blocked = blocked;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }
}