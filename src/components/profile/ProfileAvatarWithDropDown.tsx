import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileId, useProfile } from "@lens-protocol/react-web";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LoadingSpinner } from "../LoadingSpinner";

const AvatarDropdown = ({
  profileId,
  onClick,
  logout,
}: {
  profileId: ProfileId;
  onClick?: () => void;
  logout?: () => void;
}) => {
  const { data, error, loading } = useProfile({
    profileId: profileId,
  });
  if (loading)
    return (
      <div className="container mx-auto">
        <LoadingSpinner />
      </div>
    );

  if (error) return <div className="container mx-auto">Error</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar onClick={onClick}>
          <AvatarImage
            src={
              data?.picture?.__typename === "NftImage"
                ? data?.picture?.uri
                : data?.picture?.original?.url
            }
            alt={data.handle}
          />
          <AvatarFallback>{data?.handle}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout}>
          <Link href={`/profile/${data.id}`}>{data.handle}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AvatarDropdown };
