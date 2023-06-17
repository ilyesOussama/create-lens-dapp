import { Skeleton } from "@/components/ui/skeleton";

const PublicationSkeleton = () => {
  return (
    <div className="flex space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 min-w-[450px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
};

export { PublicationSkeleton };
