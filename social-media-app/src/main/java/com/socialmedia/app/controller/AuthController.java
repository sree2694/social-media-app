package com.socialmedia.app.controller;

import com.socialmedia.app.entity.User;
import com.socialmedia.app.security.JwtUtil;
import com.socialmedia.app.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;
    private final JwtUtil jwtUtil;
    PasswordEncoder encoder;

    public AuthController(AuthService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = service.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User savedUser = service.getUserByUsername(user.getUsername());
        if (!encoder.matches(user.getPassword(), savedUser.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(savedUser.getUsername());
        return ResponseEntity.ok().body("Bearer " + token);
    }

}
