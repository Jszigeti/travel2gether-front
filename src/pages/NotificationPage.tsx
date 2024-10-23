import NotificationComponent from "../components/UI/NotificationComponent";
import { notifList } from "../data/notifList";
import { NotificationComponentInterface } from "../interfaces/Notification";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";

function NotificationPage() {
  return (
    <>
      <Header pageTitle="Mes notifications" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {notifList.map((notif: NotificationComponentInterface) => (
          <NotificationComponent key={notif.id} notif={notif} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default NotificationPage;
