/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Create a context for the authentication state
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({children} ) => {

  const [userData, setUserData] = useState(null);

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decoded = jwt_decode(token);
    setUserData(decoded);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 