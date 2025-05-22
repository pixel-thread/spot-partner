import '@/src/styles/global.css';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';

import { Slot } from 'expo-router';
import { AuthProvider } from '../components/providers/auth';
import { TQueryProvider } from '../components/providers/query';
import { AuthGuard } from '../components/guard/auth';
import React, { useEffect } from 'react';
import { SubscriptionProvider } from '../components/providers/subscription';

export default function RootLayout() {
  const [isMounted, setMounted] = React.useState(false);
  useEffect(() => {
    if (!isMounted) {
      setMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <TQueryProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <AuthGuard>
              <Slot />
            </AuthGuard>
          </SubscriptionProvider>
        </AuthProvider>
      </TQueryProvider>
    </GluestackUIProvider>
  );
}
