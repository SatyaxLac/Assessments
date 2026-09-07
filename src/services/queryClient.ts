import { QueryClient } from '@tanstack/react-query';

// One retry keeps a flaky request recoverable without making failures slow to
// surface; the stale time stops the catalog refetching on every tab switch.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 min
      refetchOnWindowFocus: false,
    },
  },
});
