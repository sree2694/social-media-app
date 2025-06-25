package com.socialmedia.app.controller;

import com.socialmedia.app.model.Post;
import com.socialmedia.app.service.PostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody Map<String, String> payload) {
        String content = payload.get("content");
        String author = payload.get("author");  // from frontend/localStorage
        return postService.createPost(content, author);
    }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deletePost(@PathVariable Long id) {
     postService.deletePost(id);
     return ResponseEntity.noContent().build();
     }

     @PutMapping("/{id}")
     public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Map<String, String> body) {
     String content = body.get("content");
     return ResponseEntity.ok(postService.updatePost(id, content));
     }

}
