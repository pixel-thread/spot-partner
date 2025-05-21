import React from 'react';
import { Box } from '~/src/components/ui/box';
import { HStack } from '~/src/components/ui/hstack';
import { VStack } from '~/src/components/ui/vstack';
import { Text } from '~/src/components/ui/text';
import { Image } from '~/src/components/ui/image';
import { FlatList, Pressable } from 'react-native';
import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { Card } from '@components/ui/card';
import { Skeleton, SkeletonText } from '~/src/components/ui/skeleton';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { useRouter } from 'expo-router';

type ParkingT = z.infer<typeof parkingSchema>;
type ParkingItemProps = {
  item: ParkingT;
};

export const ParkingListItem: React.FC<ParkingItemProps> = ({ item }) => {
  // Default image if none provided
  const router = useRouter();
  const imageUrl =
    item.image ||
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const onPress = () => {
    router.push({
      pathname: '/parking/[id]',
      params: { id: item.id },
    });
  };
  return (
    <Pressable onPress={onPress}>
      <Card className="mb-2 w-full overflow-hidden rounded-xl">
        <VStack className="aspect-video w-full">
          {/* Left side - Image */}
          {item.status && (
            <Box
              className={`absolute right-0 top-0 z-10 rounded-tr-lg px-2 py-0.5 ${item.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'}`}>
              <Text
                size="2xs"
                className={`${item.status === 'ACTIVE' ? 'text-green-700' : 'text-red-700'}`}>
                {item.status}
              </Text>
            </Box>
          )}
          <Box className="aspect-video w-full">
            <Image
              source={{ uri: imageUrl }}
              className="aspect-video h-full w-auto rounded-xl object-cover object-center"
              alt={item.name}
            />
          </Box>
        </VStack>
        <VStack space="xs" className="w-full justify-between p-3">
          {/* Top section - Name and Price */}
          <HStack className="items-start justify-between">
            <VStack space="xs" className="flex-1">
              <Text size="lg" bold className="flex-shrink text-gray-900" numberOfLines={1}>
                {item.name}
              </Text>
              <HStack space="xs" className="items-center">
                {/* <LocationIcon size="xs" className="text-gray-500" /> */}
                <Text size="xs" className="flex-shrink text-gray-500" numberOfLines={1}>
                  {item.city}
                </Text>
              </HStack>
              <HStack space="xs" className="items-center">
                {/* <LocationIcon size="xs" className="text-gray-500" /> */}
                <Text size="xs" className="flex-shrink text-gray-500" numberOfLines={1}>
                  {item.address}
                </Text>
              </HStack>
            </VStack>

            <HStack className="items-center rounded-lg bg-primary-50 px-2 py-1">
              {/* <CurrencyDollarIcon size="xs" className="text-primary-600" /> */}
              <Text bold className="text-primary-600">
                ₹{item.price}/hr
              </Text>
            </HStack>
          </HStack>

          {/* Middle section - Features */}
          <Text size="xs" className="text-gray-600" numberOfLines={1}>
            {item.features}
          </Text>

          {/* Bottom section - Hours and Rating */}
          <HStack className="mt-1 items-center justify-between">
            <HStack space="xs" className="items-center">
              {/* <ClockIcon size="xs" className="text-gray-500" /> */}
              <Text size="xs" className="text-gray-500">
                {item.openHours || 'Open 24/7'}
              </Text>
            </HStack>

            {item.rating && item.rating.length > 0 ? (
              <HStack space="xs" className="items-center">
                {/* <StarIcon size="xs" className="text-amber-500" /> */}
                <Text size="xs" className="text-gray-700">
                  {item.rating.length} ratings
                </Text>
              </HStack>
            ) : (
              <Text size="xs" className="text-gray-400">
                No ratings
              </Text>
            )}
          </HStack>

          {/* Status indicator */}
        </VStack>
      </Card>
    </Pressable>
  );
};

// Skeleton component for loading state
export const ParkingListItemSkeleton: React.FC = () => {
  return (
    <Box className="mb-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <HStack>
        {/* Left side - Image skeleton */}
        <Box className="h-32 w-1/3">
          <Skeleton variant="rounded" className="h-full w-full rounded-l-xl" />
        </Box>

        {/* Right side - Content skeleton */}
        <VStack space="xs" className="w-2/3 justify-between p-3">
          {/* Top section skeleton */}
          <HStack className="items-start justify-between">
            <VStack space="xs" className="flex-1">
              <Skeleton variant="rounded" className="h-5 w-3/4" />
              <HStack space="xs" className="items-center">
                <Skeleton variant="circular" className="h-3 w-3" />
                <Skeleton variant="rounded" className="h-3 w-2/3" />
              </HStack>
            </VStack>

            <Skeleton variant="rounded" className="h-6 w-16 rounded-lg" />
          </HStack>

          {/* Middle section skeleton */}
          <Skeleton variant="rounded" className="h-3 w-5/6" />

          {/* Bottom section skeleton */}
          <HStack className="mt-1 items-center justify-between">
            <HStack space="xs" className="items-center">
              <Skeleton variant="circular" className="h-3 w-3" />
              <Skeleton variant="rounded" className="h-3 w-20" />
            </HStack>

            <HStack space="xs" className="items-center">
              <Skeleton variant="circular" className="h-3 w-3" />
              <Skeleton variant="rounded" className="h-3 w-16" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export const ParkingList = () => {
  const { user } = useAuth();
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['parkings'],
    queryFn: async () =>
      await http.get<ParkingT[]>(
        PARKING_ENDPOINT.GET_PARKING_BY_USER_ID.replace(':userId', user?.id || '')
      ),
    select: (data) => data?.data,
    enabled: !!user,
  });
  // if (isPending || isFetching) {
  //   return (
  //     <FlatList
  //       data={Array.from({ length: 30 })}
  //       renderItem={() => <ParkingListItemSkeleton />}
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 100 }}
  //     />
  //   );
  // }
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ParkingListItem item={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};
