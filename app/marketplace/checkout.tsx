import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Badge,
  Button,
  Card,
  ErrorState,
  Screen,
  SectionLabel,
  Skeleton,
  StateView,
  Text,
} from '@/components/ui';
import { useEmiPlans } from '@/hooks/useEmiPlans';
import { useProduct } from '@/hooks/useProducts';
import { formatINR } from '@/services/emi';
import { colors, radius, shadow, spacing } from '@/theme';

/**
 * Checkout / order summary. Reads the selection from route params, re-derives
 * the product and chosen EMI plan, shows a summary, and confirms the (mock)
 * order. On success it shows a confirmation state.
 */
export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId: string;
    planId: string;
    price: string;
    variants: string;
  }>();

  const price = Number(params.price);
  const productQuery = useProduct(params.productId);
  const product = productQuery.data;
  const emiQuery = useEmiPlans(price, product?.maxNoCostTenure);

  const plan = useMemo(
    () => emiQuery.data?.find((p) => p.id === params.planId) ?? null,
    [emiQuery.data, params.planId],
  );

  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    // Simulate placing the order against the backend.
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
    }, 1200);
  };

  if (confirmed) {
    return (
      <Screen>
        <View style={styles.successWrap}>
          <StateView
            icon="checkmark-circle-outline"
            title="Order confirmed!"
            message={`Your no-cost EMI plan is set up${
              plan ? ` at ${formatINR(plan.monthlyAmount)}/mo for ${plan.tenureMonths} months` : ''
            }. Track it under EMI Dues.`}
            actionLabel="Back to Shop"
            onAction={() => router.replace('/shop')}
          />
        </View>
      </Screen>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12} accessibilityLabel="Go back">
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text variant="h3">Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      {productQuery.isLoading || emiQuery.isLoading ? (
        <CheckoutSkeleton />
      ) : productQuery.isError || !product ? (
        <ErrorState onRetry={() => productQuery.refetch()} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <SectionLabel>ORDER SUMMARY</SectionLabel>
            <Card padded>
              <View style={styles.productRow}>
                <Image source={{ uri: product.image }} style={styles.thumb} resizeMode="cover" />
                <View style={styles.productInfo}>
                  <Text variant="caption">{product.brand}</Text>
                  <Text variant="h3">{product.name}</Text>
                  {params.variants ? (
                    <Text variant="caption" color={colors.textSecondary}>
                      {params.variants}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.divider} />
              <Row label="Item price" value={formatINR(price)} />
            </Card>

            <SectionLabel style={styles.section}>PAYMENT PLAN</SectionLabel>
            {plan ? (
              <Card padded>
                <View style={styles.planHeader}>
                  <Text variant="h2" color={colors.primary}>
                    {formatINR(plan.monthlyAmount)}
                    <Text variant="body" color={colors.textSecondary}>
                      {' '}
                      / month
                    </Text>
                  </Text>
                  {plan.noCost ? (
                    <Badge label="No-cost EMI" tone="success" />
                  ) : (
                    <Badge label={`${plan.interestRate}% p.a.`} tone="warning" />
                  )}
                </View>
                <View style={styles.divider} />
                <Row label="Tenure" value={`${plan.tenureMonths} months`} />
                <Row label="Monthly instalment" value={formatINR(plan.monthlyAmount)} />
                <Row
                  label="Total payable"
                  value={formatINR(plan.totalPayable)}
                  emphasize
                />
                {plan.noCost ? (
                  <Text variant="caption" color={colors.success} style={styles.noteText}>
                    You pay no interest — total equals the item price.
                  </Text>
                ) : null}
              </Card>
            ) : (
              <Text variant="bodyMuted">Selected plan is unavailable. Please go back and re-select.</Text>
            )}

            <View style={styles.pledgeNote}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
              <Text variant="caption" color={colors.textSecondary} style={styles.pledgeText}>
                Backed by your pledged mutual funds. No credit score impact.
              </Text>
            </View>
          </ScrollView>

          <SafeAreaView edges={['bottom']} style={styles.ctaBar}>
            <View style={styles.ctaInner}>
              <Button
                label={confirming ? 'Confirming…' : 'Confirm & proceed'}
                loading={confirming}
                disabled={!plan}
                onPress={handleConfirm}
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </SafeAreaView>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <View style={styles.row}>
      <Text variant="bodyMuted">{label}</Text>
      <Text variant={emphasize ? 'h3' : 'body'}>{value}</Text>
    </View>
  );
}

function CheckoutSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton width="40%" height={12} />
      <Skeleton height={110} borderRadius={radius.lg} style={styles.skGap} />
      <Skeleton width="40%" height={12} style={styles.skGapLg} />
      <Skeleton height={160} borderRadius={radius.lg} style={styles.skGap} />
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
  successWrap: { flex: 1, justifyContent: 'center' },
  productRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: radius.md, backgroundColor: colors.cardMuted },
  productInfo: { flex: 1, gap: 2 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  section: { marginTop: spacing.xxl },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
  },
  planHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  noteText: { marginTop: spacing.sm },
  pledgeNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  pledgeText: { flex: 1 },
  ctaBar: {
    backgroundColor: colors.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    ...shadow.floating,
  },
  ctaInner: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  skGap: { marginTop: spacing.md },
  skGapLg: { marginTop: spacing.xl },
});
