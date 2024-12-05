// REACT HOOKS
import { createContext, useState, ReactNode, useEffect } from "react";

// TOKEN DECODER
import { jwtDecode } from "jwt-decode";

// AXIOS FUNCTIONS
import { getNotifications } from "../../api/notification";

// INTERFACES
import { NotificationComponentInterface } from "../../interfaces/Notification";

// CONTEXT INTERFACE
interface UserContextType {
  userId: number | null;
  logout: () => void;
  nbNotReadNotifications: number;
  updateNbNotReadNotifications: (count: number) => void;
  notificationsList: NotificationComponentInterface[] | undefined;
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
  const [nbNotReadNotifications, setNbNotReadNotifications] =
    useState<number>(0);
  const [notificationsList, setNotificationsList] = useState<
    NotificationComponentInterface[] | undefined
  >(undefined);

  useEffect(() => {
    // STORE USER ID FROM TOKEN
    const handleTokenChange = () => {
      const newUserId = getUserIdFromToken();
      setUserId(newUserId);
    };

    // EDIT LOCALSTORAGE FUNCTIONS
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (...args) {
      originalSetItem.apply(this, args);
      if (args[0] === "token") {
        handleTokenChange();
      }
    };
    const originalRemoveItem = localStorage.removeItem;
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

  // UPDATE THE UNREAD NOTIFICATIONS COUNT
  const updateNbNotReadNotifications = (count: number) => {
    setNbNotReadNotifications(count);
  };

  // RETRIEVE NOTIFICATIONS
  const loadNotifications = async () => {
    if (userId) {
      const notifications = await getNotifications(userId); // Assume getNotifications is imported
      setNotificationsList(notifications);
      // UPDATE THE UNREAD NOTIFICATIONS COUNT
      const notReadCount = notifications.filter(
        (notif) => !notif.isRead
      ).length;
      setNbNotReadNotifications(notReadCount);
    }
  };

  // LOAD NOTIFICATIONS WHEN USERID
  useEffect(() => {
    loadNotifications();
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userId,
        logout,
        nbNotReadNotifications,
        updateNbNotReadNotifications,
        notificationsList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
