import React, { useState } from 'react';
import api from '../../services/api';

const PostForm = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const author = localStorage.getItem('username') || 'Guest';

    try {
      const res = await api.post('/posts', { content, author });
      setContent('');
      onPost(res.data);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default PostForm;
