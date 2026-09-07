import { StateView } from '@/components/ui';

// Top Brands and Nearby Stores are intentionally out of scope, so they get a
// deliberate "coming soon" state rather than an empty screen.
export function PlaceholderTab({ title }: { title: string }) {
  return (
    <StateView
      icon="construct-outline"
      title={`${title} is coming soon`}
      message="This section isn’t available yet. Explore the 1Fi Marketplace in the meantime."
    />
  );
}
