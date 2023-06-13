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
import { convertIpfsUrl } from "@/lib/convertIpfsUrl";
import { log } from "console";
import Link from "next/link";

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
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

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
          <Link href={`/profile/${data.handle}`}>{data.handle}</Link>
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
