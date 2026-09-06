/** Centralized React Query keys so caches invalidate consistently. */
export const queryKeys = {
  products: ['products'] as const,
  product: (id: string) => ['product', id] as const,
  emiPlans: (price: number, maxTenure: number) => ['emiPlans', price, maxTenure] as const,
};
