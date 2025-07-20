// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await API.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div
            key={post._id}
            className="border rounded-md shadow-md p-4 hover:shadow-lg transition-all"
          >
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              {post.category?.name || "Uncategorized"}
            </p>
            <p className="line-clamp-3">{post.content}</p>
            <Link
              to={`/posts/${post._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
