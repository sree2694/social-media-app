import React, { useEffect, useState } from 'react';
import api from '../services/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts on load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;
    try {
      await api.post('/posts', { content: newPost });
      setNewPost('');
      fetchPosts(); // reload after posting
    } catch (err) {
      console.error('Failed to post:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Feed</h1>

      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={handlePostSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow">
            <div className="font-semibold">{post.author}</div>
            <div className="text-gray-700">{post.content}</div>
            <div className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default HomePage;
