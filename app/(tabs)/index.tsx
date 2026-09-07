import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HeroBanner } from '@/components/HeroBanner';
import { Button, Card, Screen, SectionLabel, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface Feature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const FEATURES: Feature[] = [
  { icon: 'trending-up-outline', title: 'Keep growing', subtitle: 'No tax, no exit load.' },
  { icon: 'pricetag-outline', title: '0% interest', subtitle: 'Repay only what you spend.' },
  { icon: 'flash-outline', title: 'Quickest approvals', subtitle: 'Instant eligibility check.' },
  { icon: 'shield-checkmark-outline', title: 'Zero charges', subtitle: 'No fees, nothing hidden.' },
];

const STEPS = [
  { n: 1, title: 'Connect your portfolio', icon: 'link-outline' as const },
  { n: 2, title: 'Unlock your limit', icon: 'lock-open-outline' as const },
  { n: 3, title: 'Shop & pay later', icon: 'bag-handle-outline' as const },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeroBanner
          badge="GET STARTED"
          title="Shop on"
          emphasis="no-cost EMI"
          subtitle="Backed by your mutual funds. No credit pull, no charges, quick approval."
        />
        <Button
          label="Check eligibility"
          variant="secondary"
          fullWidth={false}
          style={styles.heroCta}
          onPress={() => router.push('/shop')}
        />

        <SectionLabel style={styles.section}>WHY PAY WITH 1FI</SectionLabel>
        <View style={styles.featureGrid}>
          {FEATURES.map((f) => (
            <Card key={f.title} style={styles.featureCard} padded>
              <Ionicons name={f.icon} size={22} color={colors.primary} />
              <Text variant="h3" style={styles.featureTitle}>
                {f.title}
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {f.subtitle}
              </Text>
            </Card>
          ))}
        </View>

        <SectionLabel style={styles.section}>HOW 1FI WORKS</SectionLabel>
        <Card padded>
          {STEPS.map((s, i) => (
            <View key={s.n} style={[styles.step, i < STEPS.length - 1 && styles.stepDivider]}>
              <View style={styles.stepBadge}>
                <Text variant="caption" color={colors.textOnPrimary} style={styles.stepNum}>
                  {s.n}
                </Text>
              </View>
              <Ionicons name={s.icon} size={20} color={colors.primary} />
              <Text variant="body" style={styles.stepTitle}>
                {s.title}
              </Text>
            </View>
          ))}
        </Card>

        <Card style={styles.shopCta} padded>
          <View style={styles.shopCtaText}>
            <Text variant="h3">Ready to shop?</Text>
            <Text variant="caption" color={colors.textSecondary}>
              Browse the 1Fi Marketplace on no-cost EMI.
            </Text>
          </View>
          <Button
            label="Go to Shop"
            fullWidth={false}
            onPress={() => router.push('/shop')}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  heroCta: { marginTop: spacing.md, paddingHorizontal: spacing.xxl },
  section: { marginTop: spacing.xxl },
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  featureCard: { width: '47.5%', gap: spacing.xs },
  featureTitle: { marginTop: spacing.xs },
  step: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  stepDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { fontWeight: '800' },
  stepTitle: { flex: 1 },
  shopCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  shopCtaText: { flex: 1, gap: 2 },
});
