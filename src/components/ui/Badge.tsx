import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './Text';

type Tone = 'success' | 'primary' | 'neutral' | 'warning';

interface BadgeProps {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
}

/** Small pill badge, e.g. the green "No-cost EMI" / "NO-COST EMIs" tags. */
export function Badge({ label, tone = 'success', style }: BadgeProps) {
  const toneStyle = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: toneStyle.bg }, style]}>
      <Text variant="caption" color={toneStyle.fg} style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const tones: Record<Tone, { bg: string; fg: string }> = {
  success: { bg: colors.successSoft, fg: colors.success },
  primary: { bg: colors.primarySoft, fg: colors.primary },
  neutral: { bg: colors.background, fg: colors.textSecondary },
  warning: { bg: '#FEF3E0', fg: colors.warning },
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  label: { fontWeight: '700' },
});
