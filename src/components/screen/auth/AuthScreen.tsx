import { View } from 'react-native';
import { Text } from '@components/ui/text';
import { VStack } from '@components/ui/vstack';
import { LoginForm } from './LoginForm';

export const AuthScreen = () => {
  return (
    <View className="flex-1 justify-center bg-white px-6">
      <VStack space="lg" className="mx-auto w-full max-w-md">
        <Text className="mb-8 text-center text-3xl font-bold text-black">Welcome Back</Text>
        <LoginForm />
      </VStack>
    </View>
  );
};
