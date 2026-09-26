package com.example.cooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.cooking.dto.ChangePasswordDto;
import com.example.cooking.models.User;
import com.example.cooking.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Register User
    public User registerUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }


    // Find User By Email
    public User findByEmail(String email) {

        return userRepository.findByEmail(email).orElse(null);
    }


    // Find User By ID
    public User findById(Long id) {

        return userRepository.findById(id).orElse(null);
    }


    // User Login
    public User loginUser(String email, String password) {

        User user =
                userRepository.findByEmail(email).orElse(null);

        // User must exist
        if (user == null) {
            return null;
        }

        // Blocked users cannot log in
        if (user.isBlocked()) {
            return null;
        }

        // Check password
        if (passwordEncoder.matches(
                password,
                user.getPassword()
        )) {
            return user;
        }

        return null;
    }


    // Get All Users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // Update Profile
    public User updateProfile(Long id, User updatedUser) {

        User user =
                userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setFullname(updatedUser.getFullname());
        user.setBio(updatedUser.getBio());
        user.setProfilePicture(
                updatedUser.getProfilePicture()
        );

        return userRepository.save(user);
    }


    // Change Password
    public boolean changePassword(
            Long id,
            ChangePasswordDto dto) {

        User user =
                userRepository.findById(id).orElse(null);

        if (user == null) {
            return false;
        }

        // Check current password
        if (!passwordEncoder.matches(
                dto.getCurrentPassword(),
                user.getPassword()
        )) {
            return false;
        }

        // Hash the new password
        user.setPassword(
                passwordEncoder.encode(
                        dto.getNewPassword()
                )
        );

        userRepository.save(user);

        return true;
    }


    // Delete User
    public boolean deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return false;
        }

        userRepository.deleteById(id);

        return true;
    }


    // Block User
    public User blockUser(Long id) {

        User user =
                userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setBlocked(true);

        return userRepository.save(user);
    }


    // Unblock User
    public User unblockUser(Long id) {

        User user =
                userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setBlocked(false);

        return userRepository.save(user);
    }
}