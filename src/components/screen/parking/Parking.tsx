import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';
import { Box } from '~/src/components/ui/box';
import { HStack } from '~/src/components/ui/hstack';
import { VStack } from '~/src/components/ui/vstack';
import { Text } from '~/src/components/ui/text';
import { Image } from '~/src/components/ui/image';
import { RefreshControl, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Card } from '@components/ui/card';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from '~/src/components/ui/button';
import { Icon } from '../../ui/icon';
import { UpdateParkingForm } from './UpdateParking';
import React from 'react';
import { PlanCardSheet } from '../plan/PlanCard';

type ParkingT = Required<z.infer<typeof parkingSchema>>;

export const Parking = () => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isAddingSlot, setIsAddingSlot] = React.useState(false);
  const { id } = useLocalSearchParams();
  const parkingId = id?.toString();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['parking', id],
    queryFn: async () =>
      http.get<ParkingT>(PARKING_ENDPOINT.GET_PARKING_BY_ID.replace(':id', parkingId)),
    enabled: !!parkingId,
    select: (res) => res?.data,
  });

  const imageUrl =
    data?.image ||
    'https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp';

  if (isLoading || !data) {
    return (
      <Box className="flex-1 bg-gray-50">
        <Card className="w-full overflow-hidden rounded-2xl shadow-md">
          <Box className="h-48 w-full animate-pulse bg-gray-200" />
          <VStack space="md" className="p-6">
            <Box className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <Box className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-200" />
            <Box className="h-4 w-2/3 animate-pulse rounded-lg bg-gray-200" />
          </VStack>
        </Card>
      </Box>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          tintColor="#4F46E5"
          colors={['#4F46E5']}
        />
      }>
      <Box className="relative">
        <Image source={{ uri: imageUrl }} className="h-72 w-full object-cover" alt={data.name} />
        {data.status && (
          <Box
            className={`absolute right-4 top-4 rounded-xl px-4 py-2 shadow-md ${
              data.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'
            }`}>
            <Text
              size="sm"
              className={`font-semibold ${
                data.status === 'ACTIVE' ? 'text-green-700' : 'text-red-700'
              }`}>
              {data.status}
            </Text>
          </Box>
        )}
      </Box>

      <VStack space="xl" className="p-6">
        <VStack space="sm">
          <Text size="3xl" bold className="text-gray-900">
            {data.name}
          </Text>
          <HStack space="sm" className="items-center">
            <FontAwesome size={18} name="map-marker" color="#4F46E5" />
            <Text size="lg" className="text-gray-600">
              {data.city}
              {data.address ? `, ${data.address}` : ''}
            </Text>
          </HStack>
        </VStack>

        <Card className="rounded-2xl p-6 shadow-md">
          <HStack className="justify-between">
            <VStack>
              <Text size="2xl" bold className="text-primary-700">
                ₹{data.price}/hr
              </Text>
              <Text size="md" className="text-gray-600">
                Parking Fee
              </Text>
            </VStack>
            <VStack className="items-end">
              <Text size="2xl" bold className="text-primary-700">
                {data.slots?.length || 0}/{data.slots?.length}
              </Text>
              <Text size="md" className="text-gray-600">
                Available Spots
              </Text>
            </VStack>
          </HStack>
        </Card>

        <HStack space="sm" className="justify-between">
          <Button variant="outline">
            <FontAwesome size={18} name="cloud-upload" />
            <ButtonText>Image</ButtonText>
          </Button>
          <Button onPress={() => setIsUpdating(true)} variant="outline">
            <FontAwesome size={18} name="edit" />
          </Button>
          <Button onPress={() => setIsAddingSlot(true)} className=" bg-primary-600">
            <FontAwesome size={18} name="sliders" color="#fff" />
            <ButtonText>Slot</ButtonText>
          </Button>
        </HStack>

        {data.description && (
          <VStack space="md">
            <Text size="xl" bold className="text-gray-900">
              Description
            </Text>
            <HStack space="xs" className="items-center">
              <Text size="md" className="text-gray-600">
                {data.description}
              </Text>
            </HStack>
          </VStack>
        )}
        {data.features && (
          <VStack space="md">
            <Text size="xl" bold className="text-gray-900">
              Features
            </Text>
            <HStack space="xs" className="items-center">
              <Text size="md" className="text-gray-600">
                {data.features}
              </Text>
            </HStack>
          </VStack>
        )}

        <VStack space="sm">
          <Text size="lg" bold className="text-gray-900">
            Opening Hours
          </Text>
          <HStack space="xs" className="items-center">
            <FontAwesome size={16} name="clock-o" color="#6B7280" />
            <Text size="md" className="text-gray-600">
              {data.openHours || 'Open 24/7'}
            </Text>
          </HStack>
        </VStack>

        {data.rating && data.rating.length > 0 && (
          <VStack space="sm">
            <Text size="lg" bold className="text-gray-900">
              Ratings
            </Text>
            <HStack space="xs" className="items-center">
              <FontAwesome size={16} name="star" color="#F59E0B" />
              <Text size="md" className="text-gray-600">
                {data.rating.length} ratings
              </Text>
            </HStack>
          </VStack>
        )}
      </VStack>
      <UpdateParkingForm
        initialData={data}
        open={isUpdating}
        onClose={() => setIsUpdating(false)}
      />
      <PlanCardSheet
        open={isAddingSlot && !!data.id}
        onClose={() => setIsAddingSlot(false)}
        parkingId={data.id}
      />
    </ScrollView>
  );
};
