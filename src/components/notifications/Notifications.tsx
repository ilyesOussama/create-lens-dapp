import { NotificationTypes } from "@lens-protocol/react-web";
import { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsList } from "./NotificationsList";
import { PublisherContext } from "@/context/ProfileContext";

const Notifications = () => {
  const { profileOwnedByMe } = useContext(PublisherContext);

  const allNotificationsTypes = [
    NotificationTypes.CommentedComment,
    NotificationTypes.CommentedPost,
    NotificationTypes.ReactionPost,
    NotificationTypes.MentionPost,
    NotificationTypes.MentionComment,
    NotificationTypes.CollectedComment,
    NotificationTypes.CollectedPost,
    NotificationTypes.Followed,
    NotificationTypes.MirroredComment,
    NotificationTypes.MirroredPost,
    NotificationTypes.ReactionComment,
  ];

  return (
    <>
      {profileOwnedByMe && (
        <div className="w-full">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All notifications</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="collects">Collects</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="reactions">Reactions</TabsTrigger>
              <TabsTrigger value="mirrors">Mirrors</TabsTrigger>
              <TabsTrigger value="followed">Followed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <NotificationsList
                notificationTypes={allNotificationsTypes}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="mentions">
              <NotificationsList
                notificationTypes={[
                  NotificationTypes.MentionComment,
                  NotificationTypes.MentionPost,
                ]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="collects">
              <NotificationsList
                notificationTypes={[
                  NotificationTypes.CollectedComment,
                  NotificationTypes.CollectedPost,
                ]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="comments">
              <NotificationsList
                notificationTypes={[
                  NotificationTypes.CommentedComment,
                  NotificationTypes.CommentedPost,
                ]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="reactions">
              <NotificationsList
                notificationTypes={[
                  NotificationTypes.ReactionPost,
                  NotificationTypes.ReactionComment,
                ]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="followed">
              <NotificationsList
                notificationTypes={[NotificationTypes.Followed]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
            <TabsContent value="mirrors">
              <NotificationsList
                notificationTypes={[
                  NotificationTypes.MirroredComment,
                  NotificationTypes.MirroredPost,
                ]}
                profileId={profileOwnedByMe.id}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Notifications;
