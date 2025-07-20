// src/pages/PostDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Comments from "../components/Comments";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      )}
      <p><strong>By:</strong> {post.author?.username || "Unknown"}</p>
      <p><strong>Category:</strong> {post.category?.name || "Uncategorized"}</p>
      <p>{post.content}</p>

      <hr />
      <Comments postId={post._id} />
    </div>
  );
}
