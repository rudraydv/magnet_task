import React, { createContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser({ name: "User" }); 
  }
}, []);



 // Logout function
 const logout = async () => {
  try {
    
    await fetch("http://localhost:4000/api/auth/logout", {
      method: "GET",
      credentials: "include", 
    });

    // Clear user state and local storage
    setUser(null);
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  return (
    <AuthContext.Provider value={{ user, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
