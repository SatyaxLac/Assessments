import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client. One retry keeps the demo snappy while still
 * exercising the retry path; stale time avoids refetching on every focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 min
      refetchOnWindowFocus: false,
    },
  },
});
