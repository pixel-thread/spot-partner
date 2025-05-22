import { Box } from '~/src/components/ui/box';
import { Fab, FabIcon } from '~/src/components/ui/fab';
import { AddIcon } from '~/src/components/ui/icon';
import { useState } from 'react';
import { AddParkingForm } from '../parking/AddParkingForm';
import { ParkingList } from '../parking/ParkingList';

export const HomeScreen = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  return (
    <Box className="h-screen flex-1 items-center justify-center">
      <ParkingList />
      <Fab
        size="lg"
        placement="bottom right"
        isHovered={false}
        isDisabled={isSheetOpen}
        isPressed={false}
        onPress={() => setIsSheetOpen(true)}>
        <FabIcon as={AddIcon} />
      </Fab>
      {isSheetOpen && <AddParkingForm open={isSheetOpen} onClose={() => setIsSheetOpen(false)} />}
    </Box>
  );
};
