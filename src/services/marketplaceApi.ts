import { PRODUCTS } from '@/data/products.mock';
import { EmiPlan, Product } from '@/data/types';
import { buildEmiPlans } from './emi';

// The single seam a real backend would replace. Raise failureRate to 1 to
// exercise the error states in the UI.
export const marketplaceApiConfig = {
  latencyMs: 650,
  failureRate: 0,
};

export type MarketplaceErrorKind = 'network' | 'timeout' | 'notFound';

export class MarketplaceApiError extends Error {
  readonly kind: MarketplaceErrorKind;

  constructor(kind: MarketplaceErrorKind, message: string) {
    super(message);
    this.name = 'MarketplaceApiError';
    this.kind = kind;
  }
}

export function errorKindOf(error: unknown): MarketplaceErrorKind {
  return error instanceof MarketplaceApiError ? error.kind : 'network';
}

async function simulateRoundTrip(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, marketplaceApiConfig.latencyMs));
  if (Math.random() >= marketplaceApiConfig.failureRate) return;

  // A slow link times out roughly a third of the time it fails; the rest are
  // outright connection failures. The two read differently to the user.
  throw Math.random() < 0.33
    ? new MarketplaceApiError('timeout', 'The request took too long to respond.')
    : new MarketplaceApiError('network', 'Network request failed.');
}

export async function fetchMarketplaceProducts(): Promise<Product[]> {
  await simulateRoundTrip();
  return [...PRODUCTS];
}

export async function fetchMarketplaceProduct(id: string): Promise<Product> {
  await simulateRoundTrip();
  const product = PRODUCTS.find((candidate) => candidate.id === id);
  if (!product) {
    throw new MarketplaceApiError('notFound', 'This product is no longer available.');
  }
  return product;
}

// Separate from the catalog because eligibility and tenures come from the
// lending side in a real system, not from product data.
export async function fetchEmiPlans(price: number, maxNoCostTenure: number): Promise<EmiPlan[]> {
  await simulateRoundTrip();
  return buildEmiPlans(price, maxNoCostTenure);
}
