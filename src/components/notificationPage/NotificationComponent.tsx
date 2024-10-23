import { NavLink } from "react-router-dom";
import {
  NotificationComponentInterface,
  NotificationEnum,
} from "../../interfaces/Notification";
import { Alert } from "@material-tailwind/react";
//import { getNotifications, editNotification } from "../../api/notification";
//import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface NotificationComponentProps {
  notif: NotificationComponentInterface;
}

function NotificationComponent({ notif }: NotificationComponentProps) {
  const handleReadNotification = () => {
    // editNotification();
  };

  /*const handleNotificationDelete = (notif.id) => {};*/

  return (
    <NavLink
      to={
        notif.reference_type?.includes(NotificationEnum.GROUP_MESSAGE)
          ? `/group/${notif.reference_id}/messages`
          : notif.reference_type?.includes(NotificationEnum.PRIVATE_MESSAGE)
          ? `/my-profile/messages/${notif.reference_id}`
          : `/group/${notif.reference_id}`
      }
      onClick={handleReadNotification}
    >
      <Alert
        className={
          notif.isRead ? "bg-blue-gray-100 text-blue-gray-500" : "bg-blue"
        }
      >
        <h3 className="font-bold">{notif.reference_type}</h3>
        {notif.details}
      </Alert>
    </NavLink>
  );
}

export default NotificationComponent;
