import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { HeroBanner } from '@/components/HeroBanner';
import { OffersCarousel } from '@/components/OffersCarousel';
import { FaqSection } from '@/components/FaqSection';
import { Button, Card, Screen, SectionLabel, Text } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

interface Feature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const FEATURES: Feature[] = [
  { icon: 'pricetag-outline', title: '0% interest', subtitle: 'Repay only what you spend.' },
  { icon: 'trending-up-outline', title: 'Keep growing', subtitle: 'No tax, no exit load.' },
  { icon: 'shield-checkmark-outline', title: 'Zero charges', subtitle: 'No fees, nothing hidden.' },
  { icon: 'flash-outline', title: 'Quickest approvals', subtitle: 'Instant eligibility check.' },
];

const TOP_BRANDS = [
  { name: 'goibibo', label: 'Goibibo', icon: 'airplane-outline' as const },
  { name: 'wakefit', label: 'Wakefit', icon: 'bed-outline' as const },
  { name: 'easemytrip', label: 'EaseMyTrip', icon: 'paper-plane-outline' as const },
  { name: 'yatra', label: 'Yatra', icon: 'navigate-outline' as const },
  { name: 'taj', label: 'Taj', icon: 'business-outline' as const },
  { name: 'apple', label: 'Apple', icon: 'logo-apple' as const },
];

const STEPS = [
  { n: 1, title: 'Connect your portfolio', icon: 'link-outline' as const },
  { n: 2, title: 'Unlock your limit', icon: 'lock-open-outline' as const },
  { n: 3, title: 'Shop & pay later', icon: 'bag-handle-outline' as const },
];

const HERO_BG = require('../../assets/hero-banner.png');
const REFER_BANNER_IMG = require('../../assets/refer-earn-banner.png');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Hero Banner with inline CTA and 0% interest background */}
        <HeroBanner
          badge="GET STARTED"
          title="Shop on"
          emphasis="no-cost EMI"
          subtitle="Backed by your mutual funds. No credit pull, No charges, & quick approval."
          actionLabel="Check eligibility"
          onAction={() => router.push('/eligibility')}
          backgroundImage={HERO_BG}
        />

        {/* OFFERS Section with Sliding Carousel */}
        <SectionLabel style={styles.section}>OFFERS</SectionLabel>
        <OffersCarousel />

        {/* SHOP USING 1FI AT TOP BRANDS */}
        <SectionLabel style={styles.section}>SHOP USING 1FI AT TOP BRANDS</SectionLabel>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandsRow}
        >
          {TOP_BRANDS.map((b) => (
            <Pressable
              key={b.name}
              style={styles.brandItem}
              onPress={() => router.push('/shop')}
            >
              <View style={styles.brandIconWrap}>
                <Ionicons name={b.icon} size={20} color={colors.primary} />
              </View>
              <Text variant="caption" style={styles.brandName}>
                {b.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* WHY PAY WITH 1FI */}
        <SectionLabel style={styles.section}>WHY PAY WITH 1FI</SectionLabel>
        <View style={styles.featureGrid}>
          {FEATURES.map((f) => (
            <Card key={f.title} style={styles.featureCard} padded>
              <View style={styles.featureIconWrap}>
                <Ionicons name={f.icon} size={20} color={colors.primary} />
              </View>
              <Text variant="h3" style={styles.featureTitle}>
                {f.title}
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                {f.subtitle}
              </Text>
            </Card>
          ))}
        </View>

        {/* HOW 1FI WORKS */}
        <SectionLabel style={styles.section}>HOW 1FI WORKS</SectionLabel>
        <Card padded>
          <View style={styles.stepsRow}>
            {STEPS.map((s) => (
              <View key={s.n} style={styles.stepCol}>
                <View style={styles.stepCircleWrap}>
                  <View style={styles.stepCircle}>
                    <Ionicons name={s.icon} size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.stepBadge}>
                    <Text variant="caption" color="#FFFFFF" style={styles.stepNum}>
                      {s.n}
                    </Text>
                  </View>
                </View>
                <Text variant="caption" color={colors.textSecondary} style={styles.stepLabel}>
                  {s.title.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* REFER & EARN BANNER */}
        <Pressable
          style={styles.referBannerWrap}
          onPress={() => router.push('/refer')}
          accessibilityRole="button"
          accessibilityLabel="Invite friends and earn up to 1000 rupees"
        >
          <Image
            source={REFER_BANNER_IMG}
            style={styles.referBannerImage}
            resizeMode="cover"
          />
        </Pressable>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <Pressable onPress={() => router.push('/faq')}>
          <SectionLabel style={styles.section}>FREQUENTLY ASKED QUESTIONS</SectionLabel>
        </Pressable>
        <FaqSection />

        {/* Ready to shop banner */}
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
  section: { marginTop: spacing.xxl },

  // Brands row
  brandsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  brandItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  brandIconWrap: {
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandName: {
    fontWeight: '600',
    fontSize: 11,
  },

  // Features grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  featureCard: {
    width: '47.5%',
    gap: spacing.xs,
  },
  featureIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  featureTitle: { marginTop: spacing.xs },

  // Steps – horizontal circular layout
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  stepCol: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  stepCircleWrap: {
    position: 'relative',
  },
  stepCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E1E2F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  stepNum: { fontWeight: '800', fontSize: 11 },
  stepLabel: {
    fontWeight: '700',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // Refer & Earn Banner
  referBannerWrap: {
    width: '100%',
    aspectRatio: 812 / 325,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: spacing.xl,
    shadowColor: '#6D3EF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  referBannerImage: {
    width: '100%',
    height: '100%',
  },

  // Shop CTA
  shopCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  shopCtaText: { flex: 1, gap: 2 },
});
