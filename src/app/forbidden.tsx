'use client';

import { View } from 'react-native';
import { Text } from '~/src/components/ui/text';
import { Button, ButtonText } from '~/src/components/ui/button';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/auth/useAuth';
import { removeToken } from '../utils/storage/token';

export default function ForbiddenPage() {
  const { refresh } = useAuth();
  const router = useRouter();
  const onClickLogout = async () => {
    await removeToken();
    refresh();
  };
  return (
    <View className="flex h-screen items-center justify-center">
      <Text size="6xl" bold className="mb-2 text-red-500">
        403
      </Text>
      <Text className="mb-6 text-center text-base text-gray-600">
        You {`don't`} have permission to access this page.
      </Text>

      <View className="flex flex-row gap-2">
        <Button size="lg" variant="outline" onPress={() => router.replace('/')}>
          <ButtonText>Go to Home</ButtonText>
        </Button>
        <Button variant="solid" className="bg-red-600" size="lg" onPress={onClickLogout}>
          <ButtonText>Log out</ButtonText>
        </Button>
      </View>
    </View>
  );
}
