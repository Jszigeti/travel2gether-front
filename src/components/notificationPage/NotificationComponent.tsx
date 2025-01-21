// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import {
  NotificationInterface,
  NotificationEnum,
} from "../../interfaces/Notification";

// COMPONENTS
import { Alert } from "@material-tailwind/react";
import { useNotifApi } from "../../api/notification";
import { toast } from "react-toastify";

// PROPS INTERFACE
interface NotificationComponentProps {
  notification: NotificationInterface;
}

function NotificationComponent({ notification }: NotificationComponentProps) {
  const { markAsRead } = useNotifApi();

  const toggleRead = () => {
    try {
      markAsRead(notification.id);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const getNotificationUrl = () => {
    if (notification.referenceType?.includes(NotificationEnum.PRIVATE_MESSAGE))
      return `/my-profile/messages/${notification.referenceId}`;
    if (notification.referenceType?.includes(NotificationEnum.GROUP_INVITATION))
      return `/my-profile/invitations`;
    if (notification.referenceType?.includes(NotificationEnum.GROUP_REQUEST))
      return `/group/${notification.referenceId}/manage`;
    return `/group/${notification.referenceId}`;
  };

  const alertClassName = notification.isRead
    ? "bg-blue-gray-100 text-blue-gray-500"
    : "bg-blue";

  return (
    <NavLink to={getNotificationUrl()} onClick={() => toggleRead()}>
      <Alert className={alertClassName}>
        <h3 className="font-bold">{notification.referenceType}</h3>
        <p>{notification.details}</p>
      </Alert>
    </NavLink>
  );
}

export default NotificationComponent;
