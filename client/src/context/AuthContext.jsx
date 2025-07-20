import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    await fetchUser();
  };

  const register = async (data) => {
    const res = await axios.post("/api/auth/register", data);
    localStorage.setItem("token", res.data.token);
    await fetchUser();
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
