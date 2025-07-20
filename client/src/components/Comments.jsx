// src/components/Comments.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const fetchComments = async () => {
    const res = await API.get(`/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await API.post(`/posts/${postId}/comments`, { content });
    setContent("");
    fetchComments(); // Refresh comments after posting
  };

  return (
    <div className="comments">
      <h4>Comments</h4>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((c) => (
        <div key={c._id} className="comment">
          <strong>{c.user?.username}:</strong> {c.content}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            style={{ padding: "8px", width: "100%" }}
          />
          <button type="submit" style={{ marginTop: "0.5rem" }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
