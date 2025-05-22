import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl } from 'react-native';
import { useAuth } from '~/src/hooks/auth/useAuth';
import http from '~/src/utils/https';
import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { ParkingListItemSkeleton } from './ParkingListItemsSkeleton';
import { ParkingListItem } from './ParkingListItems';

type ParkingT = z.infer<typeof parkingSchema>;

export const ParkingList = () => {
  const { user } = useAuth();
  const { refetch, data, isPending, isFetching } = useQuery({
    queryKey: ['parkings'],
    queryFn: () =>
      http.get<ParkingT[]>(
        PARKING_ENDPOINT.GET_PARKING_BY_USER_ID.replace(':userId', user?.id || '')
      ),
    select: (data) => data?.data,
    enabled: !!user,
  });

  if (isPending || isFetching) {
    return (
      <FlatList
        data={Array.from({ length: 10 })}
        renderItem={() => <ParkingListItemSkeleton />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor="#4F46E5"
            colors={['#4F46E5']}
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ParkingListItem item={item} />}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          tintColor="#4F46E5"
          colors={['#4F46E5']}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};
