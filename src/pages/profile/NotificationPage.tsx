// REACT HOOKS
import { useState } from "react";

// REACT QUERY
import { useQueryClient } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// AXIOS FUNCTIONS
import { useNotifApi } from "../../api/notification";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import NotificationComponent from "../../components/notificationPage/NotificationComponent";

function NotificationPage() {
  // STATES
  const [error, setError] = useState<null | string>(null);
  const { markAsRead } = useNotifApi();
  // RETRIEVE USER AND NOTIFICATIONS LIST FROM CONTEXT
  const { user, notificationsList } = useAuthContext();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // SET NOTIFICATION AS READ AND UPDATE NOTIFICATION BADGE FUNCTION
  const handleReadNotification = async (notificationId: number) => {
    if (user) {
      try {
        setError(null);
        const response = await markAsRead(notificationId);
        console.log("Notification lue", response);
        queryClient.invalidateQueries({ queryKey: ["notificationsList"] });
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message);
        } else {
          setError("Une erreur est survenue");
        }
        console.log(errors);
      }
    }
  };

  if (!notificationsList)
    return (
      <>
        <Header pageTitle="Chargement" backLink="/" />
        <div className="text-blue text-center">Chargement des données...</div>
        <Footer />
      </>
    );

  return (
    <>
      <Header pageTitle="Mes notifications" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {notificationsList.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleReadNotification(notification.id)}
          >
            <NotificationComponent notification={notification} />
          </div>
        ))}
        {error && (
          <div className="text-red-500 text-center">
            Erreur lors de la mise à jour de la notification
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default NotificationPage;
