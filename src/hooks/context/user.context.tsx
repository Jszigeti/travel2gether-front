// REACT HOOKS
import { createContext, useState, ReactNode, useRef, useEffect } from "react";

// TOKEN DECODER
import { jwtDecode } from "jwt-decode";

// CONTEXT INTERFACE
interface UserContextType {
  userId: number | null;
}

// PROVIDER INTERFACE
interface UserProviderType {
  children: ReactNode;
}

// CREATE CONTEXT
const UserContext = createContext<UserContextType | undefined>(undefined);

// CREATE PROVIDER
export const UserProvider = ({ children }: UserProviderType) => {
  const [userId, setUserId] = useState<number | null>(null);
  const userIdRef = useRef<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<{ userId: number }>(token);
      userIdRef.current = decodedToken.userId;
      setUserId(userIdRef.current);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
