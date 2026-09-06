import { Product, Variant } from '@/data/types';

/**
 * Resolve the effective price of a product given the currently selected
 * variants. Base price plus the sum of each selected variant's delta.
 */
export function resolvePrice(product: Product, selected: Record<string, string>): number {
  const delta = Object.values(selected).reduce((sum, variantId) => {
    const variant = product.variants.find((v) => v.id === variantId);
    return sum + (variant?.priceDelta ?? 0);
  }, 0);
  return product.basePrice + delta;
}

/**
 * Default variant selection: the first in-stock option of each group.
 * Keeps the detail screen valid on first render without user interaction.
 */
export function defaultSelection(product: Product): Record<string, string> {
  const selection: Record<string, string> = {};
  for (const v of product.variants) {
    if (selection[v.group]) continue;
    if (v.inStock) selection[v.group] = v.id;
  }
  return selection;
}

/** Human-readable summary of the selected variants, e.g. "256 GB · Blue". */
export function selectionSummary(product: Product, selected: Record<string, string>): string {
  const labels: string[] = [];
  for (const variantId of Object.values(selected)) {
    const variant = product.variants.find((v: Variant) => v.id === variantId);
    if (variant) labels.push(variant.label);
  }
  return labels.join(' · ');
}
