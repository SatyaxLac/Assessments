import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmiPlanCard } from '@/components/marketplace/EmiPlanCard';
import { VariantSelector } from '@/components/marketplace/VariantSelector';
import {
  Badge,
  Button,
  Card,
  ErrorState,
  SectionLabel,
  Skeleton,
  Text,
} from '@/components/ui';
import { EmiPlan } from '@/data/types';
import { useEmiPlans } from '@/hooks/useEmiPlans';
import { useProduct } from '@/hooks/useProducts';
import {
  defaultSelection,
  resolvePrice,
  selectionSummary,
} from '@/features/marketplace/selection';
import { formatINR } from '@/services/emi';
import { colors, radius, shadow, spacing } from '@/theme';

/**
 * Product detail + EMI selection screen.
 *
 * Flow: image + name + price → variant selection (updates price and refetches
 * EMI plans) → product highlights/specs → selectable EMI plans → sticky bottom
 * CTA that carries the selection into checkout.
 */
export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const productQuery = useProduct(id);
  const product = productQuery.data;

  // Variant selection is local screen state; defaults applied once product loads.
  const [selected, setSelected] = useState<Record<string, string>>({});
  const effectiveSelected = useMemo(() => {
    if (!product) return {};
    return Object.keys(selected).length ? selected : defaultSelection(product);
  }, [product, selected]);

  const price = product ? resolvePrice(product, effectiveSelected) : undefined;

  const emiQuery = useEmiPlans(price, product?.maxNoCostTenure);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const selectedPlan = useMemo(
    () => emiQuery.data?.find((p) => p.id === selectedPlanId) ?? null,
    [emiQuery.data, selectedPlanId],
  );

  const handleSelectVariant = (group: string, variantId: string) => {
    setSelected({ ...effectiveSelected, [group]: variantId });
    // Price changes -> EMI plans refetch -> clear stale plan selection.
    setSelectedPlanId(null);
  };

  const handleProceed = () => {
    if (!product || !selectedPlan || price == null) return;
    router.push({
      pathname: '/marketplace/checkout',
      params: {
        productId: product.id,
        planId: selectedPlan.id,
        price: String(price),
        variants: selectionSummary(product, effectiveSelected),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header onBack={() => router.back()} />

      {productQuery.isLoading ? (
        <DetailSkeleton />
      ) : productQuery.isError || !product ? (
        <ErrorState
          message={(productQuery.error as Error)?.message}
          onRetry={() => productQuery.refetch()}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.imageWrap}>
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
            </View>

            <Text variant="caption">{product.brand}</Text>
            <Text variant="h1" style={styles.name}>
              {product.name}
            </Text>
            {product.tagline ? (
              <Text variant="bodyMuted" style={styles.tagline}>
                {product.tagline}
              </Text>
            ) : null}

            <View style={styles.priceRow}>
              <Text variant="price">{price != null ? formatINR(price) : '—'}</Text>
              <Badge label={`No-cost EMI upto ${product.maxNoCostTenure} months`} tone="success" />
            </View>

            <SectionLabel style={styles.section}>CHOOSE OPTIONS</SectionLabel>
            <VariantSelector
              variants={product.variants}
              selected={effectiveSelected}
              onSelect={handleSelectVariant}
            />

            <SectionLabel style={styles.section}>HIGHLIGHTS</SectionLabel>
            <Card padded>
              {product.highlights.map((h) => (
                <View key={h} style={styles.highlightRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text variant="body" style={styles.highlightText}>
                    {h}
                  </Text>
                </View>
              ))}
            </Card>

            <SectionLabel style={styles.section}>SPECIFICATIONS</SectionLabel>
            <Card padded>
              {product.specs.map((spec, i) => (
                <View
                  key={spec.label}
                  style={[styles.specRow, i < product.specs.length - 1 && styles.specDivider]}
                >
                  <Text variant="bodyMuted">{spec.label}</Text>
                  <Text variant="body" style={styles.specValue}>
                    {spec.value}
                  </Text>
                </View>
              ))}
            </Card>

            <SectionLabel style={styles.section}>CHOOSE AN EMI PLAN</SectionLabel>
            <EmiPlansSection
              query={emiQuery}
              selectedPlanId={selectedPlanId}
              onSelect={(plan) => setSelectedPlanId(plan.id)}
            />
          </ScrollView>

          <StickyCta
            price={price}
            selectedPlan={selectedPlan}
            onProceed={handleProceed}
          />
        </>
      )}
    </SafeAreaView>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
        <Ionicons name="chevron-back" size={26} color={colors.text} />
      </Pressable>
      <Text variant="h3">Product</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

/** EMI plans list with its own loading / error / empty handling. */
function EmiPlansSection({
  query,
  selectedPlanId,
  onSelect,
}: {
  query: ReturnType<typeof useEmiPlans>;
  selectedPlanId: string | null;
  onSelect: (plan: EmiPlan) => void;
}) {
  if (query.isLoading || query.isFetching) {
    return (
      <View style={styles.emiList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={78} borderRadius={radius.lg} />
        ))}
      </View>
    );
  }

  if (query.isError) {
    return (
      <ErrorState
        message="Couldn’t load EMI plans."
        onRetry={() => query.refetch()}
      />
    );
  }

  if (!query.data || query.data.length === 0) {
    return (
      <Text variant="bodyMuted" style={styles.noPlans}>
        No EMI plans available for this configuration.
      </Text>
    );
  }

  return (
    <View style={styles.emiList}>
      {query.data.map((plan) => (
        <EmiPlanCard
          key={plan.id}
          plan={plan}
          selected={plan.id === selectedPlanId}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

/** Sticky bottom bar: shows the selected plan and the primary CTA. */
function StickyCta({
  price,
  selectedPlan,
  onProceed,
}: {
  price?: number;
  selectedPlan: EmiPlan | null;
  onProceed: () => void;
}) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.ctaBar}>
      <View style={styles.ctaInner}>
        <View style={styles.ctaInfo}>
          {selectedPlan ? (
            <>
              <Text variant="h3" color={colors.primary}>
                {formatINR(selectedPlan.monthlyAmount)}/mo
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {selectedPlan.tenureMonths} months
                {selectedPlan.noCost ? ' · no-cost' : ''}
              </Text>
            </>
          ) : (
            <>
              <Text variant="h3">{price != null ? formatINR(price) : '—'}</Text>
              <Text variant="caption" color={colors.textSecondary}>
                Select a plan to continue
              </Text>
            </>
          )}
        </View>
        <Button
          label="Proceed"
          fullWidth={false}
          disabled={!selectedPlan}
          onPress={onProceed}
          style={styles.ctaButton}
        />
      </View>
    </SafeAreaView>
  );
}

function DetailSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton height={260} borderRadius={radius.lg} />
      <Skeleton width="30%" height={12} style={styles.skGap} />
      <Skeleton width="70%" height={26} style={styles.skGap} />
      <Skeleton width="50%" height={26} style={styles.skGap} />
      <Skeleton height={90} borderRadius={radius.lg} style={styles.skGapLg} />
      <Skeleton height={140} borderRadius={radius.lg} style={styles.skGapLg} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerSpacer: { width: 26 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl * 2 },
  imageWrap: {
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  image: { width: '100%', height: '100%' },
  name: { marginTop: spacing.xs },
  tagline: { marginTop: spacing.xs },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  section: { marginTop: spacing.xxl },
  highlightRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xs },
  highlightText: { flex: 1 },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  specDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  specValue: { flex: 1, textAlign: 'right' },
  emiList: { gap: spacing.md },
  noPlans: { paddingVertical: spacing.lg },
  ctaBar: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    ...shadow.floating,
  },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  ctaInfo: { flex: 1 },
  ctaButton: { paddingHorizontal: spacing.xxxl },
  skGap: { marginTop: spacing.md },
  skGapLg: { marginTop: spacing.xl },
});
