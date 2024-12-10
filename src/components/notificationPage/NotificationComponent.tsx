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
        notification.reference_type?.includes(NotificationEnum.GROUP_MESSAGE)
          ? `/group/${notification.reference_id}/messages`
          : notification.reference_type?.includes(
              NotificationEnum.PRIVATE_MESSAGE
            )
          ? `/my-profile/messages/${notification.reference_id}`
          : `/group/${notification.reference_id}`
      }
    >
      <Alert
        className={
          notification.isRead
            ? "bg-blue-gray-100 text-blue-gray-500"
            : "bg-blue"
        }
      >
        <h3 className="font-bold">{notification.reference_type}</h3>
        {notification.details}
      </Alert>
    </NavLink>
  );
}

export default NotificationComponent;
