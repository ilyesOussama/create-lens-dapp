import { cn } from "@/lib/utils";
import { TabsContent } from "../ui/tabs";
import { Notification as NotificationComponent } from "./Notification";
import {
  Notification,
  NotificationTypes,
  ProfileId,
  useNotifications,
} from "@lens-protocol/react-web";
import { LoadingSpinner } from "../LoadingSpinner";

const NotificationsList = ({
  notificationTypes,
  profileId,
}: {
  notificationTypes: NotificationTypes[];
  profileId: ProfileId;
}) => {
  const {
    data: notifications,
    error,
    loading,
  } = useNotifications({
    profileId,
    notificationTypes,
  });

  if (loading) {
    return (
      <div className="container mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto">Error</div>;
  }

  return (
    <ul className="flex flex-col gap-4 p-4 border border-b border-gray-200 dark:border-gray-800 rounded-sm">
      {notifications.map((notification, index) => (
        <li
          key={notification.notificationId}
          className={cn(
            index !== notifications.length - 1 &&
              "border-b border-gray-200 dark:border-gray-700",
            "py-2"
          )}
        >
          <NotificationComponent notification={notification} />
        </li>
      ))}
    </ul>
  );
};

export { NotificationsList };
