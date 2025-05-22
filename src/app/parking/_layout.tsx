import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Parking',
        headerTitle: 'Parking Lot',
      }}
    />
  );
}
