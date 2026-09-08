import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { EmiPlan } from '@/data/types';
import { formatINR } from '@/services/emi';
import { colors, radius, spacing } from '@/theme';
import { Badge } from '../ui/Badge';
import { Text } from '../ui/Text';

interface EmiPlanOptionProps {
  plan: EmiPlan;
  selected: boolean;
  onSelectPlan: (plan: EmiPlan) => void;
}

export function EmiPlanOption({ plan, selected, onSelectPlan }: EmiPlanOptionProps) {
  return (
    <Pressable
      onPress={() => onSelectPlan(plan)}
      accessibilityRole="radio"
      // accessibilityState covers native; react-native-web 0.21 only forwards
      // the aria-* prop, so a screen reader on web needs it spelled out too.
      accessibilityState={{ checked: selected }}
      aria-checked={selected}
      accessibilityLabel={`${plan.tenureMonths} months, ${formatINR(plan.monthlyAmount)} per month`}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.radioCol}>
        <Ionicons
          name={selected ? 'radio-button-on' : 'radio-button-off'}
          size={22}
          color={selected ? colors.primary : colors.textMuted}
        />
      </View>

      <View style={styles.mainCol}>
        <View style={styles.headerRow}>
          <Text variant="h3">{plan.tenureMonths} months</Text>
          {plan.noCost ? (
            <Badge label="No-cost EMI" tone="success" />
          ) : (
            <Badge label={`${plan.interestRate}% p.a.`} tone="warning" />
          )}
          {plan.recommended ? <Badge label="Popular" tone="primary" /> : null}
        </View>
        <Text variant="caption" color={colors.textSecondary} style={styles.sub}>
          Total {formatINR(plan.totalPayable)}
          {plan.noCost ? ' · no extra cost' : ' incl. interest'}
        </Text>
      </View>

      <View style={styles.amountCol}>
        <Text variant="h3" color={colors.primary}>
          {formatINR(plan.monthlyAmount)}
        </Text>
        <Text variant="caption" color={colors.textMuted}>
          / month
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  radioCol: { width: 24 },
  mainCol: { flex: 1, gap: 2 },
  headerRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm },
  sub: { marginTop: 2 },
  amountCol: { alignItems: 'flex-end' },
});
