import {
  NotificationTypes,
  ProfileId,
  useNotifications,
} from "@lens-protocol/react-web";

const Notifications = ({
  profileId,
  notificationTypes,
}: {
  profileId: ProfileId;
  notificationTypes?: NotificationTypes[];
}) => {
  const { data, error, loading } = useNotifications({
    profileId: profileId,
    notificationTypes,
  });

  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>loading</div>;
  }

  return (
    <ul>
      {data.map((notification) => (
        <li key={notification.notificationId}>{notification.__typename}</li>
      ))}
    </ul>
  );
};

export default Notifications;
