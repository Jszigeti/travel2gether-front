import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NotificationInterface } from "../../interfaces/Notification";
import { useNotifApi } from "../../api/notification";
import { useAuthApi } from "../../api/auth";
import { customHandleError } from "../../utils/customHandleError";

interface AuthInfos {
  id: number;
  pathPicture: string;
}

interface AuthContextType {
  user: AuthInfos | null;
  isAuthenticated: boolean;
  setAuthInfos: Dispatch<SetStateAction<AuthInfos | null>>;
  isLoading: boolean;
  login: (userId: number, pathPicture: string) => void;
  logout: () => void;
  nbNotReadNotifications: number;
  updateNbNotReadNotifications: Dispatch<SetStateAction<number>>;
  notificationsList: NotificationInterface[];
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  setAuthInfos: () => {
    console.warn("setAuthInfos() called outside the AuthProvider");
  },
  isLoading: true,
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
    NotificationInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getNotifications } = useNotifApi();

  // Axios functions
  const { me, signout } = useAuthApi();

  // Auth functions
  const login = (id: number, pathPicture: string): void => {
    setAuthInfos({ id, pathPicture });
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

  const retrieveAuthInfos = async (): Promise<void> => {
    try {
      const response = await me();
      setAuthInfos({
        id: response.user.id,
        pathPicture: response.user.pathPicture,
      });
    } catch (error) {
      console.error(
        customHandleError(error, {
          401: "Session expirée, veuillez vous reconnecter",
          403: "Compte banni, merci de nous contacter pour avoir davantage d'informations",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retrieveAuthInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notifications functions
  const loadNotifications = useCallback(async () => {
    if (authInfos) {
      try {
        const notifications = await getNotifications();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfos]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <AuthContext.Provider
      value={{
        user: authInfos,
        isAuthenticated: !!authInfos,
        setAuthInfos,
        isLoading,
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
