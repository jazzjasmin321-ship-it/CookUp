package com.example.cooking.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {

        Object adminId =
                request.getSession().getAttribute("adminId");

        if (adminId != null) {
            return true;
        }

        response.sendRedirect("/admin/login");
        return false;
    }
}