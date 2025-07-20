import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import PostForm from "./pages/PostForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
