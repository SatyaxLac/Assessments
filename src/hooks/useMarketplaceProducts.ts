import { useQuery } from '@tanstack/react-query';
import {
  fetchEmiPlans,
  fetchMarketplaceProduct,
  fetchMarketplaceProducts,
} from '@/services/marketplaceApi';

export function useMarketplaceProducts() {
  return useQuery({
    queryKey: ['marketplace', 'products'],
    queryFn: fetchMarketplaceProducts,
  });
}

export function useMarketplaceProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['marketplace', 'product', id],
    queryFn: () => fetchMarketplaceProduct(id as string),
    enabled: !!id,
  });
}

// Keyed on price so choosing a different variant refetches the plans that
// actually apply to the new amount.
export function useEmiPlans(price: number | undefined, maxNoCostTenure: number | undefined) {
  return useQuery({
    queryKey: ['marketplace', 'emiPlans', price, maxNoCostTenure],
    queryFn: () => fetchEmiPlans(price as number, maxNoCostTenure as number),
    enabled: price != null && maxNoCostTenure != null,
  });
}
