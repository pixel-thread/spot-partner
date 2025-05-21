import '@/src/styles/global.css';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';

import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Slot />
      </Stack>
    </GluestackUIProvider>
  );
}
