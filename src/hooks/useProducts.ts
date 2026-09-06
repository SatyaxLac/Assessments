import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/services/api';
import { queryKeys } from './queryKeys';

/** All marketplace products. */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
  });
}

/** A single product by id. Disabled until an id is available. */
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.product(id ?? ''),
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });
}
