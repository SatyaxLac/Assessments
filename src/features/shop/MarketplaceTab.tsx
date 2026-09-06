import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductCardSkeleton } from '@/components/marketplace/ProductCardSkeleton';
import { ErrorState, StateView } from '@/components/ui';
import { Product } from '@/data/types';
import { useProducts } from '@/hooks/useProducts';
import { spacing } from '@/theme';

interface MarketplaceTabProps {
  /** Search text from the Shop page search bar. */
  query: string;
}

/**
 * The 1Fi Marketplace listing. Fetches products via React Query and renders a
 * 2-column grid, with dedicated loading (skeletons), error (retry) and empty
 * states. Tapping a card opens the product detail route.
 *
 * Rendered inside the Shop page's parent ScrollView, so this uses a plain
 * wrapped View grid rather than its own FlatList to avoid nested scrolling.
 */
export function MarketplaceTab({ query }: MarketplaceTabProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useProducts();

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [data, query]);

  const openProduct = (product: Product) => {
    router.push(`/marketplace/product/${product.id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={styles.cell}>
            <ProductCardSkeleton />
          </View>
        ))}
      </View>
    );
  }

  if (isError) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />;
  }

  if (filtered.length === 0) {
    return (
      <StateView
        icon="search-outline"
        title={query ? 'No matching products' : 'Nothing here yet'}
        message={
          query
            ? `We couldn’t find anything for “${query}”. Try a different search.`
            : 'Products will appear here soon.'
        }
      />
    );
  }

  return (
    <View style={styles.grid}>
      {filtered.map((product) => (
        <View key={product.id} style={styles.cell}>
          <ProductCard product={product} onPress={openProduct} />
        </View>
      ))}
      {isRefetching ? <View style={styles.refetchSpacer} /> : null}
    </View>
  );
}

const GAP = spacing.md;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GAP / 2,
  },
  cell: {
    width: '50%',
    paddingHorizontal: GAP / 2,
    marginBottom: GAP,
  },
  refetchSpacer: { height: spacing.lg, width: '100%' },
});
