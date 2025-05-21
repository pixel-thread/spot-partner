import { MutationCache, QueryCache, QueryClientConfig } from '@tanstack/react-query';

export const queryClientOptions: QueryClientConfig = {
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
};
