import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      setPosts([...posts, response.data]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePosts() {
  return useContext(PostContext);
}