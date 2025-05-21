import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { queryClientOptions } from '~/src/libs/config/query';

type Props = {
  children: Readonly<React.ReactNode>;
};

const queryClient = new QueryClient(queryClientOptions);

export const TQueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
