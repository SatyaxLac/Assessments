import { PRODUCTS } from '@/data/products.mock';
import { EmiPlan, Product } from '@/data/types';
import { buildEmiPlans } from './emi';

/**
 * Mock API service.
 *
 * This is the single seam that a real backend would replace. Every function
 * returns a Promise, simulates network latency, and can fail — so the UI
 * exercises real loading / error / retry paths instead of rendering instantly.
 *
 * Tunables (also settable from a debug screen or tests):
 *  - LATENCY_MS: artificial round-trip delay
 *  - FAILURE_RATE: 0..1 probability a call rejects (0 = never, 1 = always)
 */
export const apiConfig = {
  latencyMs: 650,
  failureRate: 0, // set to e.g. 0.5 or 1 to test error states
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function simulate<T>(produce: () => T): Promise<T> {
  await delay(apiConfig.latencyMs);
  if (Math.random() < apiConfig.failureRate) {
    throw new ApiError('Network request failed. Please try again.');
  }
  return produce();
}

/** List all products in the marketplace catalog. */
export async function getProducts(): Promise<Product[]> {
  return simulate(() => [...PRODUCTS]);
}

/** Fetch a single product by id. Throws if not found. */
export async function getProduct(id: string): Promise<Product> {
  return simulate(() => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new ApiError(`Product "${id}" not found.`);
    }
    return product;
  });
}

/**
 * Fetch EMI plans for a product at a given effective price (base + variant
 * deltas). Kept as its own endpoint because in a real system EMI eligibility
 * and pricing come from the lending backend, not the catalog.
 */
export async function getEmiPlans(price: number, maxNoCostTenure: number): Promise<EmiPlan[]> {
  return simulate(() => buildEmiPlans(price, maxNoCostTenure));
}

export { ApiError };
