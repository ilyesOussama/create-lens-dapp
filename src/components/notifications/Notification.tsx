import { Notification } from "@lens-protocol/react-web";
import { ProfileAvatar } from "../profile";
import Link from "next/link";

const Notification = ({ notification }: { notification: Notification }) => {
  if (notification.__typename === "NewCommentNotification") {
    return (
      <div className="flex flex-row gap-3">
        <Link href={`/profile/${notification.profile.id}`}>
          <ProfileAvatar profileId={notification.profile.id} />
        </Link>
        <div>
          <Link href={`/profile/${notification.profile.id}`}>
            {notification.profile.name}
          </Link>
          <Link href={`/publication/${notification.comment.id}`}>
            {notification.comment.metadata.content}
          </Link>
        </div>
      </div>
    );
  }

  if (notification.__typename === "NewCollectNotification") {
    return (
      <div className="flex flex-row gap-3">
        {notification.wallet.defaultProfile?.id && (
          <Link href={`/profile/${notification.wallet.defaultProfile.id}`}>
            <ProfileAvatar profileId={notification.wallet.defaultProfile.id} />
          </Link>
        )}
        <Link href={`/publication/${notification.collectedPublication.id}`}>
          {notification.wallet.defaultProfile?.name} collected your publication
        </Link>
      </div>
    );
  }

  if (notification.__typename === "NewReactionNotification") {
    return (
      <div className="flex flex-row gap-3">
        <Link href={`/profile/${notification.profile.id}`}>
          <ProfileAvatar profileId={notification.profile.id} />
        </Link>
        <Link href={`/publication/${notification.publication.id}`}>
          {notification.profile.name} {notification.reaction} your publication
        </Link>
      </div>
    );
  }

  if (notification.__typename === "NewMentionNotification") {
    return (
      <div className="flex flex-row gap-3">
        <Link href={`/profile/${notification.mentionPublication.profile.id}`}>
          <ProfileAvatar
            profileId={notification.mentionPublication.profile.id}
          />
        </Link>
        <Link href={`/publication/${notification.mentionPublication.id}}`}>
          {notification.mentionPublication.profile.name} mentioned you{" "}
          {notification.mentionPublication.metadata.content}
        </Link>
      </div>
    );
  }

  if (notification.__typename === "NewMirrorNotification") {
    return (
      <div className="flex flex-row gap-3">
        <Link href={`/profile/${notification.profile.id}`}>
          <ProfileAvatar profileId={notification.profile.id} />
        </Link>
        <Link href={`/publication/${notification.publication.id}`}>
          {notification.profile.name} mirrored your publication
        </Link>
      </div>
    );
  }

  if (notification.__typename === "NewFollowerNotification") {
    return (
      <div className="flex flex-row gap-3">
        {notification.wallet.defaultProfile && (
          <Link href={`/profile/${notification.wallet.defaultProfile.id}`}>
            <ProfileAvatar profileId={notification.wallet.defaultProfile.id} />
          </Link>
        )}
        <Link href={`/profile/${notification.wallet.defaultProfile?.handle}`}>
          {notification.wallet.defaultProfile?.name} folled you
        </Link>
      </div>
    );
  }
};

export { Notification };
