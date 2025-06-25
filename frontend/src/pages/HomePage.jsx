import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PostForm from '../components/feed/PostForm';
import PostCard from '../components/feed/PostCard';

import {
  Box,
  Typography,
  Fade,
  Container,
  Divider,
  CircularProgress,
} from '@mui/material';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data.reverse()); // newest first
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdatePost = (updated) => {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <Container maxWidth="sm">
      <Fade in timeout={800}>
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            📰 News Feed
          </Typography>

          <PostForm onPost={handleNewPost} />

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Fade in key={post.id}>
                <Box mb={3}>
                  <PostCard
                    post={post}
                    onDelete={handleDeletePost}
                    onUpdate={handleUpdatePost}
                  />
                </Box>
              </Fade>
            ))
          ) : (
            <Typography variant="body1" align="center" color="text.secondary">
              No posts yet. Be the first to share something!
            </Typography>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default HomePage;
