import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';

import { SubscriptionContext } from '~/src/context/subscription';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PLAN_ENDPOINT } from '~/src/libs/endpoints/plan';
import { PlanT, SubscriptionContextI } from '~/src/types/subscription';
import http from '~/src/utils/https';
import { toast } from '../../ui/toast';

type SubscriptionProviderProps = {
  children: Readonly<React.ReactNode>;
};

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, data: plan } = useSuspenseQuery({
    queryFn: () => http.get<PlanT[]>(PLAN_ENDPOINT.GET_PLAN),
    queryKey: ['plan', user],
    select: (data) => {
      if (data.data && data.success) {
        return data.data[0];
      }
      return null;
    },
  });

  const { isPending: isVerifyLoading, mutate: onVerifyPayment } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      http.post(PLAN_ENDPOINT.POST_VERIFY_PAYMENT, {
        paymentId: id,
      }),
  });

  const { isPending: isSubscribeLoading, mutate: onSubScribe } = useMutation({
    mutationFn: ({ slot, id }: { slot: number; id: string }) =>
      http.post<{ id: string }>(PLAN_ENDPOINT.POST_SUBSCRIBE, {
        slot,
        userId: user?.id,
        parkingLotId: id,
      }),
    onSuccess: (data) => {
      if (data?.success) {
        const parking = data?.data;
        toast.success(data.message);
        router.push(`/parking/${parking?.id}`);
        queryClient.invalidateQueries({ queryKey: ['parking', parking?.id] });
        queryClient.invalidateQueries({ queryKey: ['parking'] });
        return data.data;
      }
      toast.error(data.message);
    },
  });

  const loading = isLoading || isSubscribeLoading || isVerifyLoading;

  const value: SubscriptionContextI = {
    plan: plan,
    isLoading: loading,
    onSubscribe: onSubScribe,
    onVerify: onVerifyPayment,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};
