import { useState, createContext, useContext, useEffect } from "react";
import { LoginUser } from "../services/userServices";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const user = await LoginUser(credentials); // Call the login service
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User sucess")
    } catch (error) {
      console.log("Login failed:", error);
      // Handle login error, e.g., show a message to the user
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
