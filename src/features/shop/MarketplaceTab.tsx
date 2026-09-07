import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MarketplaceProductCard } from '@/components/marketplace/MarketplaceProductCard';
import { MarketplaceProductCardSkeleton } from '@/components/marketplace/MarketplaceProductCardSkeleton';
import { ErrorState, StateView } from '@/components/ui';
import { Product } from '@/data/types';
import { useMarketplaceProducts } from '@/hooks/useMarketplaceProducts';
import { errorKindOf } from '@/services/marketplaceApi';
import { spacing } from '@/theme';

interface MarketplaceTabProps {
  query: string;
}

// Rendered inside the Shop page's ScrollView, so the grid is a wrapped View
// rather than a FlatList — nesting two scroll views breaks momentum on Android.
export function MarketplaceTab({ query }: MarketplaceTabProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useMarketplaceProducts();

  const matchingProducts = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return data;
    return data.filter(
      (product) =>
        product.name.toLowerCase().includes(needle) ||
        product.brand.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle),
    );
  }, [data, query]);

  const openProduct = (product: Product) => {
    router.push(`/marketplace/product/${product.id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.grid}>
        {Array.from({ length: 6 }).map((_, row) => (
          <View key={row} style={styles.cell}>
            <MarketplaceProductCardSkeleton />
          </View>
        ))}
      </View>
    );
  }

  if (isError) {
    return <ErrorState kind={errorKindOf(error)} onRetry={() => refetch()} />;
  }

  if (matchingProducts.length === 0) {
    return (
      <StateView
        icon="search-outline"
        title={query ? 'No matching products' : 'Nothing here yet'}
        message={
          query
            ? `We couldn’t find anything for “${query}”. Try a different search.`
            : 'New products are added to the Marketplace every week.'
        }
      />
    );
  }

  return (
    <View style={styles.grid}>
      {matchingProducts.map((product) => (
        <View key={product.id} style={styles.cell}>
          <MarketplaceProductCard product={product} onOpenProduct={openProduct} />
        </View>
      ))}
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
});
