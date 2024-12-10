// REACT HOOKS
import { useContext, useState } from "react";

// REACT QUERY
import { useQueryClient } from "@tanstack/react-query";

// CONTEXT
import UserContext from "../../hooks/context/user.context";

// AXIOS FUNCTIONS
import { editNotification } from "../../api/notification";

// INTERFACES
import { NotificationComponentInterface } from "../../interfaces/Notification";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import NotificationComponent from "../../components/notificationPage/NotificationComponent";

function NotificationPage() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // RETRIEVE USER ID AND NOTIFICATIONS LIST FROM CONTEXT
  const { userId, notificationsList } = useContext(UserContext) || {};

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // SET NOTIFICATION AS READ AND UPDATE NOTIFICATION BADGE FUNCTION
  const handleReadNotification = async (notificationId: number) => {
    if (userId) {
      try {
        setError(null);
        const response = await editNotification(userId, notificationId);
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
        {notificationsList.map(
          (notification: NotificationComponentInterface) => (
            <div
              key={notification.id}
              onClick={() => handleReadNotification(notification.id)}
            >
              <NotificationComponent notification={notification} />
            </div>
          )
        )}
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
