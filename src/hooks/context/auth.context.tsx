import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NotificationComponentInterface } from "../../interfaces/Notification";
import { getNotifications } from "../../api/notification";
import { useAuthApi } from "../../api/auth";
import { customHandleError } from "../../utils/customHandleError";

interface AuthInfos {
  userId: number;
  pathPicture: string;
}

interface AuthContextType {
  user: AuthInfos | null;
  isAuthenticated: boolean;
  login: (userId: number, pathPicture: string) => void;
  logout: () => void;
  nbNotReadNotifications: number;
  updateNbNotReadNotifications: Dispatch<SetStateAction<number>>;
  notificationsList: NotificationComponentInterface[];
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {
    console.warn("login() called outside the AuthProvider");
  },
  logout: () => {
    console.warn("logout() called outside the AuthProvider");
  },
  nbNotReadNotifications: 0,
  updateNbNotReadNotifications: () => {
    console.warn(
      "updateNbNotReadNotifications() called outside the AuthProvider"
    );
  },
  notificationsList: [],
};

// Create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create provider
export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // States
  const [authInfos, setAuthInfos] = useState<AuthInfos | null>(null);
  const [nbNotReadNotifications, setNbNotReadNotifications] =
    useState<number>(0);
  const [notificationsList, setNotificationsList] = useState<
    NotificationComponentInterface[]
  >([]);

  // Axios functions
  const { me, signout } = useAuthApi();

  // Auth functions
  const login = (userId: number, pathPicture: string): void => {
    setAuthInfos({ userId, pathPicture });
  };

  const logout = async (): Promise<void> => {
    try {
      await signout();
    } catch (error: unknown) {
      console.error(
        customHandleError(error, "Erreur lors de la déconnexion", 401)
      );
    } finally {
      setAuthInfos(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await me();
        setAuthInfos({
          userId: response.user.id,
          pathPicture: response.user.pathPicture,
        });
      } catch (error) {
        console.error(
          customHandleError(
            error,
            "Session expirée, veuillez vous reconnecter",
            401
          )
        );
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notifications functions
  const loadNotifications = useCallback(async () => {
    if (authInfos) {
      try {
        const notifications = await getNotifications(authInfos.userId);
        setNotificationsList(notifications);
        setNbNotReadNotifications(
          notifications.filter((notif) => !notif.isRead).length
        );
      } catch (error) {
        console.error(
          customHandleError(
            error,
            "Erreur lors du chargement des notifications",
            401
          )
        );
      }
    }
  }, [authInfos]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <AuthContext.Provider
      value={{
        user: authInfos,
        isAuthenticated: !!authInfos,
        login,
        logout,
        nbNotReadNotifications,
        updateNbNotReadNotifications: setNbNotReadNotifications,
        notificationsList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
