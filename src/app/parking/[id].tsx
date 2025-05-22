import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Parking } from '~/src/components/screen/parking/Parking';

export default function page() {
  return (
    <SafeAreaProvider>
      <Parking />;
    </SafeAreaProvider>
  );
}
