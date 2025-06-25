package com.socialmedia.app.service;

import com.socialmedia.app.model.Post;
import com.socialmedia.app.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(String content, String author) {
        Post post = new Post();
        post.setAuthor(author);
        post.setContent(content);
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

     public void deletePost(Long id) {
     postRepository.deleteById(id);
     }

     public Post updatePost(Long id, String newContent) {
     Post post = postRepository.findById(id)
          .orElseThrow(() -> new RuntimeException("Post not found"));
     post.setContent(newContent);
     return postRepository.save(post);
}

}
