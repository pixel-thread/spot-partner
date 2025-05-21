import { Text } from '@components/ui/text';
import { Box } from '~/src/components/ui/box';
import { Fab, FabLabel, FabIcon } from '~/src/components/ui/fab';
import { AddIcon } from '~/src/components/ui/icon';
import { useState } from 'react';
import { AddParkingForm } from './AddParkingForm';
import { ParkingList } from './ParkingListItems';

export const HomeScreen = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);

  return (
    <Box className="h-screen flex-1 items-center justify-center">
      <ParkingList />
      <Fab
        size="lg"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => setShowActionsheet(true)}>
        <FabIcon as={AddIcon} />
        <FabLabel>Add Parking</FabLabel>
      </Fab>
      {showActionsheet && (
        <AddParkingForm open={showActionsheet} onClose={() => setShowActionsheet(false)} />
      )}
    </Box>
  );
};
