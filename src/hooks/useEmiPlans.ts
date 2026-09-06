import { useQuery } from '@tanstack/react-query';
import { getEmiPlans } from '@/services/api';
import { queryKeys } from './queryKeys';

/**
 * EMI plans for a given effective price. Refetches whenever the price changes
 * (i.e. when the user picks a different variant), which is exactly the behavior
 * we want on the product detail screen.
 */
export function useEmiPlans(price: number | undefined, maxNoCostTenure: number | undefined) {
  return useQuery({
    queryKey: queryKeys.emiPlans(price ?? 0, maxNoCostTenure ?? 0),
    queryFn: () => getEmiPlans(price as number, maxNoCostTenure as number),
    enabled: price != null && maxNoCostTenure != null,
  });
}
