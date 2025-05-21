import { Box } from '../ui/box';
import { Spinner } from '../ui/spinner';

export const LoadingScreen = () => {
  return (
    <Box className="h-screen items-center justify-center">
      <Spinner size="large" />
    </Box>
  );
};
