import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './ui/Text';

interface HeroBannerProps {
  badge?: string;
  title: string;
  emphasis?: string; // italic emphasized middle line
  titleTail?: string;
  subtitle?: string;
}

/**
 * The purple gradient hero used on the Shop page:
 * "Shop today, Pay later using Mutual funds."
 */
export function HeroBanner({ badge, title, emphasis, titleTail, subtitle }: HeroBannerProps) {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {badge ? (
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={12} color={colors.textOnPrimary} />
          <Text variant="caption" color={colors.textOnPrimary} style={styles.badgeText}>
            {badge}
          </Text>
        </View>
      ) : null}
      <View>
        <Text variant="hero">{title}</Text>
        {emphasis ? (
          <Text variant="hero" style={styles.emphasis}>
            {emphasis}
          </Text>
        ) : null}
        {titleTail ? <Text variant="hero">{titleTail}</Text> : null}
      </View>
      {subtitle ? (
        <Text variant="bodyMuted" color="rgba(255,255,255,0.85)" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  badgeText: { fontWeight: '700', letterSpacing: 0.3 },
  emphasis: { fontStyle: 'italic', fontWeight: '600' },
  subtitle: { marginTop: spacing.sm, maxWidth: 260 },
});
