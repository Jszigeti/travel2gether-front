// REACT HOOKS
import { createContext, useState, ReactNode, useEffect } from "react";

// TOKEN DECODER
import { jwtDecode } from "jwt-decode";

// CONTEXT INTERFACE
interface UserContextType {
  userId: number | null;
  logout: () => void;
}

// PROVIDER INTERFACE
interface UserProviderType {
  children: ReactNode;
}

// CONTEXT CREATION
const UserContext = createContext<UserContextType | undefined>(undefined);

// DECODE TOKEN FUNCTION
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode<{ userId: number }>(token);
      return decodedToken.userId;
    } catch {
      console.error("Invalid token format");
      return null;
    }
  }
  return null;
};

// PROVIDER CREATION
export const UserProvider = ({ children }: UserProviderType) => {
  // STATES
  const [userId, setUserId] = useState<number | null>(getUserIdFromToken());

  useEffect(() => {
    // STORE USER ID FROM TOKEN
    const handleTokenChange = () => {
      const newUserId = getUserIdFromToken();
      setUserId(newUserId);
    };

    // RENAME LOCALSTORAGE FUNCTIONS
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    // EDIT LOCALSTORAGE FUNCTIONS
    localStorage.setItem = function (...args) {
      originalSetItem.apply(this, args);
      if (args[0] === "token") {
        handleTokenChange();
      }
    };
    localStorage.removeItem = function (...args) {
      originalRemoveItem.apply(this, args);
      if (args[0] === "token") {
        handleTokenChange();
      }
    };

    // INITIAL CHECK
    handleTokenChange();

    // CLEANING FUNCTION
    return () => {
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
