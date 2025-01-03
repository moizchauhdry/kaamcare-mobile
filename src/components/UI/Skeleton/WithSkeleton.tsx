type WithSkeletonProps = {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};

export const WithSkeleton = ({ isLoading, skeleton, children }: WithSkeletonProps) => {
  if (isLoading) {
    return skeleton;
  }

  return children;
};
