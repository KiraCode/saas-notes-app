import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const register = async (username, email, password, role, tenant) => {
    try {
      const endpoint = "/users/register";
      const url = `${baseUrl}${endpoint}`;
      console.log(url);

      const requestBody = JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: role,
        tenant: tenant,
      });
    } catch (error) {}
  };

  const login = async (email, password) => {
    try {
      const endpoint = "/users/login";
      const url = `${baseUrl}${endpoint}`;
      console.log(url);

      const requestBody = JSON.stringify({
        email: email,
        password: password,
      });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const jsonData = await res.json();

      const { accessToken } = jsonData;
      localStorage.setItem("accessToken", accessToken);

      const decodedToken = jwtDecode(accessToken);
      setUser(decodedToken);
    } catch (error) {
      console.error("Login Failed...❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
