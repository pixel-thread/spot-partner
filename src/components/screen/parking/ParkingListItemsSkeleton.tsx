import { Box } from '../../ui/box';
import { HStack } from '../../ui/hstack';
import { VStack } from '../../ui/vstack';
import { Skeleton } from '../../ui/skeleton';
import { Card } from '../../ui/card';

export const ParkingListItemSkeleton: React.FC = () => {
  return (
    <Card className="mb-3 min-w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <VStack className="w-full">
        {/* Image skeleton */}
        <Box className="relative h-48 w-full">
          <Skeleton variant="rounded" className="h-full w-full" />
          {/* Price badge skeleton */}
          <Box className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-3 py-1">
            <Skeleton variant="rounded" className="h-5 w-16" />
          </Box>
        </Box>

        {/* Content skeleton */}
        <VStack space="sm" className="w-full p-4">
          {/* Name and spots skeleton */}
          <HStack className="items-start justify-between">
            <Skeleton variant="rounded" className="h-6 w-3/5" />
            <Skeleton variant="rounded" className="h-6 w-20 rounded-lg" />
          </HStack>

          {/* Location skeleton */}
          <HStack space="xs" className="items-center">
            <Skeleton variant="circular" className="h-4 w-4" />
            <Skeleton variant="rounded" className="h-4 w-4/5" />
          </HStack>

          {/* Features skeleton */}
          <HStack space="xs" className="items-center">
            <Skeleton variant="circular" className="h-4 w-4" />
            <Skeleton variant="rounded" className="h-4 w-3/4" />
          </HStack>

          {/* Divider */}
          <Box className="h-px w-full bg-gray-100" />

          {/* Hours and Rating skeleton */}
          <HStack className="items-center justify-between">
            <HStack space="xs" className="items-center">
              <Skeleton variant="circular" className="h-4 w-4" />
              <Skeleton variant="rounded" className="h-4 w-24" />
            </HStack>

            <HStack space="xs" className="items-center">
              <Skeleton variant="circular" className="h-4 w-4" />
              <Skeleton variant="rounded" className="h-4 w-20" />
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};
