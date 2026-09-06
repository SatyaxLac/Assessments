import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HeroBanner } from '@/components/HeroBanner';
import { SearchBar, SegmentedTabs, type SegmentOption } from '@/components/ui';
import { Screen } from '@/components/ui/Screen';
import { MarketplaceTab } from '@/features/shop/MarketplaceTab';
import { PlaceholderTab } from '@/features/shop/PlaceholderTab';
import { spacing } from '@/theme';

const TABS: SegmentOption[] = [
  { key: 'top-brands', label: 'Top Brands' },
  { key: 'nearby', label: 'Nearby Stores' },
  { key: 'marketplace', label: '1Fi Marketplace' },
];

/**
 * Shop page. Reproduces the existing layout — gradient hero, segmented tabs,
 * search — and adds the new "1Fi Marketplace" tab alongside the existing
 * (placeholder) Top Brands and Nearby Stores tabs.
 */
export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [query, setQuery] = useState('');

  const isMarketplace = activeTab === 'marketplace';

  return (
    <Screen padded={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <HeroBanner
          badge="NO-COST EMIs"
          title="Shop today,"
          emphasis="Pay later using"
          titleTail="Mutual funds."
          subtitle="No credit score required. No interest. Backed by your investments."
        />

        <View style={styles.tabs}>
          <SegmentedTabs
            options={TABS}
            value={activeTab}
            onChange={setActiveTab}
            scrollable
          />
        </View>

        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={isMarketplace ? 'Search products…' : 'Search online stores…'}
          style={styles.search}
        />

        <View style={styles.tabContent}>
          {activeTab === 'top-brands' && <PlaceholderTab title="Top Brands" />}
          {activeTab === 'nearby' && <PlaceholderTab title="Nearby Stores" />}
          {isMarketplace && <MarketplaceTab query={query} />}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  tabs: { marginTop: spacing.xl },
  search: { marginTop: spacing.lg },
  tabContent: { marginTop: spacing.xl },
});
