// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import {
  NotificationComponentInterface,
  NotificationEnum,
} from "../../interfaces/Notification";

// COMPONENTS
import { Alert } from "@material-tailwind/react";

// PROPS INTERFACE
interface NotificationComponentProps {
  notification: NotificationComponentInterface;
}

function NotificationComponent({ notification }: NotificationComponentProps) {
  return (
    <NavLink
      to={
        notification.referenceType?.includes(NotificationEnum.GROUP_MESSAGE)
          ? `/group/${notification.referenceId}/messages`
          : notification.referenceType?.includes(
              NotificationEnum.PRIVATE_MESSAGE
            )
          ? `/my-profile/messages/${notification.referenceId}`
          : `/group/${notification.referenceId}`
      }
    >
      <Alert
        className={
          notification.isRead
            ? "bg-blue-gray-100 text-blue-gray-500"
            : "bg-blue"
        }
      >
        <h3 className="font-bold">{notification.referenceType}</h3>
        {notification.details}
      </Alert>
    </NavLink>
  );
}

export default NotificationComponent;
