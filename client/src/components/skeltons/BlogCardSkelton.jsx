import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white border-gray border-2 border-solid box-border rounded-md w-full overflow-hidden flex flex-col items-start justify-center pb-6 gap-2 text-left text-xs">
      {/* Skeleton for the image */}
      <Skeleton height={200} width="100%" />

      <div className="flex flex-col items-start justify-start px-6 gap-[0.625rem] w-full">
        {/* Skeleton for the date */}
        <Skeleton width="30%" height={20} />

        {/* Skeleton for the title */}
        <Skeleton width="70%" height={24} />

        {/* Skeleton for the content (3 lines) */}
        <Skeleton count={3} width="100%" height={16} />

        {/* Skeleton for the 'Read more' link */}
        <Skeleton width="40%" height={20} />
      </div>
    </div>
  );
};
