import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentSection({ courseId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://learnhub-backend-qtw7.onrender.com/api/comments/${courseId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post('https://learnhub-backend-qtw7.onrender.com/api/comments', {
        courseId,
        userId: user.id,
        text
      });
      setComments(prev => [...prev, { text, userId: { name: user.name }, createdAt: new Date() }]);
      setText('');
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">💬 Comments</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border rounded-md p-2 focus:ring focus:ring-indigo-300"
          rows={3}
          required
        />
        <button
          type="submit"
          className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Post
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((c, idx) => (
          <div key={idx} className="bg-white p-3 rounded shadow text-sm">
            <div className="font-medium text-indigo-700">{c.userId?.name || 'Anonymous'}</div>
            <div className="text-gray-800 mt-1">{c.text}</div>
            <div className="text-gray-400 text-xs mt-1">{new Date(c.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
      </div>
    </div>
  );
}

export default CommentSection;
