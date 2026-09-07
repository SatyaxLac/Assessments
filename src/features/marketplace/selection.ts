import { Product } from '@/data/types';

type SelectedVariantIds = Record<string, string>;

export function resolvePrice(product: Product, selectedVariantIds: SelectedVariantIds): number {
  const delta = Object.values(selectedVariantIds).reduce((sum, variantId) => {
    const variant = product.variants.find((candidate) => candidate.id === variantId);
    return sum + (variant?.priceDelta ?? 0);
  }, 0);
  return product.basePrice + delta;
}

// First in-stock option of each group, so the detail screen has a valid,
// purchasable configuration before the user touches anything.
export function defaultSelection(product: Product): SelectedVariantIds {
  const selection: SelectedVariantIds = {};
  for (const variant of product.variants) {
    if (selection[variant.group] || !variant.inStock) continue;
    selection[variant.group] = variant.id;
  }
  return selection;
}

export function selectionSummary(product: Product, selectedVariantIds: SelectedVariantIds): string {
  return Object.values(selectedVariantIds)
    .map((variantId) => product.variants.find((candidate) => candidate.id === variantId)?.label)
    .filter((label): label is string => !!label)
    .join(' · ');
}
