// src/pages/PostForm.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const { id } = useParams(); // If editing, id will exist
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
    if (id) {
      API.get(`/posts/${id}`).then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category?._id || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("category", category);
    if (image) form.append("image", image);

    if (id) {
      await API.put(`/posts/${id}`, form);
    } else {
      await API.post("/posts", form);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
      <h2>{id ? "Edit" : "Create"} Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />

      <button type="submit">{id ? "Update" : "Publish"}</button>
    </form>
  );
}
