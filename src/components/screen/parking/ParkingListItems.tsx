import React from 'react';
import { Box } from '~/src/components/ui/box';
import { HStack } from '~/src/components/ui/hstack';
import { VStack } from '~/src/components/ui/vstack';
import { Text } from '~/src/components/ui/text';
import { Image } from '~/src/components/ui/image';
import { Pressable } from 'react-native';
import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { Card } from '@components/ui/card';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ParkingT = z.infer<typeof parkingSchema>;

type ParkingItemProps = { item: ParkingT };

export const ParkingListItem: React.FC<ParkingItemProps> = ({ item }) => {
  const router = useRouter();

  const imageUrl =
    item.image ||
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const onPress = () => {
    router.push(`/parking/${item.id}`);
  };

  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3 min-w-full overflow-hidden rounded-xl shadow-sm">
        <VStack className="w-full">
          {/* Image section with status badge */}
          <Box className="relative">
            <Image
              source={{ uri: imageUrl }}
              className="h-48 w-full rounded-xl object-cover object-center"
              alt={item.name}
            />
            {item.status && (
              <Box
                className={`absolute right-3 top-3 z-10 rounded-lg px-2 py-1 ${item.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'}`}>
                <Text
                  size="xs"
                  className={`font-medium ${item.status === 'ACTIVE' ? 'text-green-700' : 'text-red-700'}`}>
                  {item.status}
                </Text>
              </Box>
            )}

            {/* Price badge */}
            <Box className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-3 py-1 shadow-sm">
              <HStack space="xs" className="items-center">
                <FontAwesome size={14} name="rupee" color="#4F46E5" />
                <Text bold className="text-primary-600">
                  {item.price}/hr
                </Text>
              </HStack>
            </Box>
          </Box>

          {/* Content section */}
          <VStack space="sm" className="w-full p-4">
            {/* Name and spots */}
            <HStack className="items-start justify-between">
              <Text size="lg" bold className="flex-1 text-gray-900" numberOfLines={1}>
                {item.name}
              </Text>
              <HStack className="items-center rounded-lg bg-primary-50 px-2 py-1">
                <Text bold className="text-primary-600">
                  {item.slots?.length || 0} Spots
                </Text>
              </HStack>
            </HStack>

            {/* Location */}
            <HStack space="xs" className="items-center">
              <FontAwesome size={16} name="map-marker" color="#4F46E5" />
              <Text size="sm" className="flex-shrink text-gray-600" numberOfLines={1}>
                {item.city}
                {item.address ? `, ${item.address}` : ''}
              </Text>
            </HStack>

            {/* Features */}
            {item.features && (
              <HStack space="xs" className="items-center">
                <FontAwesome size={16} name="list" color="#6B7280" />
                <Text size="sm" className="text-gray-600" numberOfLines={1}>
                  {item.features}
                </Text>
              </HStack>
            )}

            {/* Divider */}
            <Box className="h-px w-full bg-gray-100" />

            {/* Hours and Rating */}
            <HStack className="items-center justify-between">
              <HStack space="xs" className="items-center">
                <FontAwesome size={16} name="clock-o" color="#6B7280" />
                <Text size="sm" className="text-gray-600">
                  {item.openHours || 'Open 24/7'}
                </Text>
              </HStack>

              {item.rating && item.rating.length > 0 ? (
                <HStack space="xs" className="items-center">
                  <FontAwesome size={16} name="star" color="#F59E0B" />
                  <Text size="sm" bold className="text-gray-700">
                    {item.rating.length} ratings
                  </Text>
                </HStack>
              ) : (
                <Text size="sm" className="text-gray-400">
                  No ratings
                </Text>
              )}
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </Pressable>
  );
};
