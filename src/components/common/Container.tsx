// components/ui/Container.tsx
import React from 'react';
import { Box } from '../ui/box';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface ContainerProps extends ViewProps {}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Box className="flex-1 items-center justify-center" {...props}>
      {children}
    </Box>
  );
};
