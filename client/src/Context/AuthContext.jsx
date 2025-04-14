import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const res = await axios.get("http://localhost:9000/api/verify-token", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (res.data.ok) {
            const { iat, exp, ...userData } = res.data.user; // Excluir iat y exp
            setUser(userData);
            setToken(storedToken);
            console.log("Usuario establecido:", userData); // Para depuración
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error verificando token:", error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);