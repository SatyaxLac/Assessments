import { StateView } from '@/components/ui';

/**
 * Blank placeholder for the Top Brands and Nearby Stores tabs. Per the brief
 * these are intentionally not implemented — we show a tasteful "coming soon"
 * state instead of a broken empty screen.
 */
export function PlaceholderTab({ title }: { title: string }) {
  return (
    <StateView
      icon="construct-outline"
      title={`${title} is coming soon`}
      message="This section isn’t available yet. Explore the 1Fi Marketplace in the meantime."
    />
  );
}
