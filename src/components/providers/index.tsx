import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthProvider } from './auth';
import { TQueryProvider } from './query';
import { SubscriptionProvider } from './subscription';
import { AuthGuard } from '../guard/auth';
import { useAppTheme } from '~/src/hooks/useAppTheme';
import { useEffect } from 'react';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const MainProviders = ({ children }: Props) => {
  const { isDark, setTheme } = useAppTheme();

  // No need for the useEffect here - the theme store will automatically
  // load from storage and apply the saved theme preference
  useEffect(() => {
    // Load the theme from storage
    if (isDark) {
      setTheme(isDark ? 'dark' : 'light');
    }
  }, [isDark, setTheme]);
  return (
    <TQueryProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <AuthGuard>
            <View className="h-full w-full">{children}</View>
            <Toast position="bottom" topOffset={50} />
          </AuthGuard>
        </SubscriptionProvider>
      </AuthProvider>
    </TQueryProvider>
  );
};
