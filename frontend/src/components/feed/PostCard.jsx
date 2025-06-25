import React, { useState } from 'react';
import api from '../../services/api';

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post.id}`);
      onDelete(post.id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/posts/${post.id}`, { content: editedContent });
      setIsEditing(false);
      onUpdate(res.data);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const isOwner = localStorage.getItem('username') === post.author;

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <div className="font-bold">{post.author}</div>
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 mr-2 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-2 py-1 rounded">Cancel</button>
        </>
      ) : (
        <div className="text-gray-800">{post.content}</div>
      )}
      <div className="text-xs text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </div>
      {isOwner && !isEditing && (
        <div className="mt-2">
          <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-3">Edit</button>
          <button onClick={handleDelete} className="text-red-500">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
