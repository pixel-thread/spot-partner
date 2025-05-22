import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '~/src/components/ui/actionsheet';
import { Button, ButtonText } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { useSubscription } from '~/src/hooks/subscription/useSubscription';
import { PlanCardSkeleton } from './PlanCardSkeleton';
import { Ternary } from '../../common/Ternary';
import { PLAN_ENDPOINT } from '~/src/libs/endpoints/plan';
import http from '~/src/utils/https';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logger } from '~/src/utils/logger';

type PlanCardSheetProps = {
  parkingId: string;
  open: boolean;
  onClose: () => void;
};
type SubscribeT = {
  slot: string;
  parkingLotId: string;
  userId: string;
};
type PlanT = {
  id: string;
};
export const PlanCardSheet = ({ parkingId, open, onClose }: PlanCardSheetProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState(5);
  const { plan, isLoading } = useSubscription();
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const DISCOUNT_RATE = plan?.discount;

  const { isPending: isSubscribeLoading, mutate: onSubScribe } = useMutation({
    mutationFn: (data: SubscribeT) => http.post<PlanT>(PLAN_ENDPOINT.POST_SUBSCRIBE, data),
    onSuccess: (data) => {
      if (data?.success) {
        const parking = data?.data;
        queryClient.invalidateQueries({ queryKey: ['parking', parking?.id] });
        queryClient.invalidateQueries({ queryKey: ['parkings'] });
        onClose();
        return data.data;
      }
      logger.log(data.message);
      // toast.error(data.message);
    },
  });

  useEffect(() => {
    if (plan && selectedSlot && DISCOUNT_RATE) {
      const original = plan.price * selectedSlot;
      const discountPerSlot = plan.price * (DISCOUNT_RATE / 100);
      const totalDiscount = selectedSlot * discountPerSlot;
      const discounted = Math.round(original - totalDiscount);

      setOriginalPrice(original);
      setDiscountedPrice(discounted);
    }
  }, [plan, selectedSlot, DISCOUNT_RATE]);

  const handleCheckout = async () => {
    if (selectedSlot && parkingId) {
      onSubScribe({
        slot: selectedSlot.toString(),
        parkingLotId: parkingId,
        userId: user?.id || '',
      });
    }
  };

  return (
    <Actionsheet isOpen={open} onClose={onClose} shouldRasterizeIOS>
      <ActionsheetBackdrop />
      <ActionsheetContent className="h-[85%] bg-white px-4 pb-4">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Ternary
          condition={isLoading || !user || !plan?.price}
          ifTrue={<PlanCardSkeleton />}
          ifFalse={
            <ScrollView className="w-full">
              <View className="w-full">
                <Text className="text-2xl font-bold text-gray-900">Premium</Text>
                <Text className="mt-2 text-gray-600">Book up to 6,000 slots each month.</Text>

                {/* Slot Selector */}
                <View className="mt-6">
                  <Text className="text-sm font-medium text-gray-700">Slots</Text>
                  <View className="mt-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-2">
                    <TouchableOpacity
                      className="h-9 w-9 items-center justify-center rounded-full bg-gray-200"
                      onPress={() => setSelectedSlot((prev) => Math.max(1, prev - 1))}>
                      <Ionicons name="remove" size={20} color="#4b5563" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold text-gray-900">{selectedSlot}</Text>
                    <TouchableOpacity
                      className="h-9 w-9 items-center justify-center rounded-full bg-blue-500"
                      onPress={() => setSelectedSlot((prev) => prev + 5)}>
                      <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Pricing */}
                <View className="mt-6 border-t border-gray-100 pt-4">
                  <View className="flex-row items-center">
                    <Text className="mr-2 text-base text-gray-500 line-through">
                      ₹{originalPrice}
                    </Text>
                    <View className="rounded bg-green-100 px-2 py-1">
                      <Text className="text-xs font-medium text-green-700">
                        {DISCOUNT_RATE}% OFF
                      </Text>
                    </View>
                  </View>
                  <Text className="mt-1 text-3xl font-bold text-gray-900">
                    ₹{discountedPrice}
                    <Text className="text-xl font-normal text-gray-500"> /mo</Text>
                  </Text>
                  <Text className="mt-1 text-sm text-gray-500">
                    Then, starts at ₹{originalPrice}/month
                  </Text>
                </View>

                {/* Benefits */}
                <View className="my-6 rounded-xl bg-gray-50 p-4">
                  <Text className="mb-3 text-sm font-semibold text-gray-800">Partner Benefits</Text>
                  <View className="gap-y-4">
                    {[
                      {
                        icon: 'cash-outline',
                        title: 'Earn Money',
                        text: 'Generate income from your unused parking spaces',
                      },
                      {
                        icon: 'calendar-outline',
                        title: 'Flexible Schedule',
                        text: 'You decide when to rent your spaces',
                      },
                      {
                        icon: 'shield-checkmark-outline',
                        title: 'Secure Payments',
                        text: 'Get paid directly to your account',
                      },
                      {
                        icon: 'trending-up-outline',
                        title: 'Growing Demand',
                        text: 'Join a marketplace with increasing user base',
                      },
                    ].map((item, index) => (
                      <View key={index} className="mb-2 flex-row">
                        <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Ionicons name={item.icon as any} size={18} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                          <Text className="font-medium text-gray-800">{item.title}</Text>
                          <Text className="text-gray-600">{item.text}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <Button
                  isDisabled={isLoading || isSubscribeLoading}
                  size="lg"
                  disabled={!parkingId}
                  onPress={handleCheckout}>
                  <ButtonText>Buy Now</ButtonText>
                </Button>

                <Text className="mt-3 text-center text-xs text-gray-500">
                  *See Offer Terms. Overages apply if slot limit is exceeded.{' '}
                  <Text className="text-blue-500">Learn more</Text>
                </Text>
              </View>
            </ScrollView>
          }
        />
      </ActionsheetContent>
    </Actionsheet>
  );
};
