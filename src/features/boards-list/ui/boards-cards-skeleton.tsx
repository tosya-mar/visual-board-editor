import { Skeleton } from "@shared/ui/kit/skeleton";

export function BoardsCardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className="aspect-[16/10] w-full rounded-xl"
        />
      ))}
    </div>
  );
}
