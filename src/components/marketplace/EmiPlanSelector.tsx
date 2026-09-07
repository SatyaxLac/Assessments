import { StyleSheet, View } from 'react-native';
import { EmiPlan } from '@/data/types';
import { radius, spacing } from '@/theme';
import { ErrorState, Skeleton, Text } from '../ui';
import { EmiPlanOption } from './EmiPlanOption';

interface EmiPlanSelectorProps {
  plans: EmiPlan[] | undefined;
  isLoading: boolean;
  hasFailed: boolean;
  selectedPlanId: string | null;
  onSelectPlan: (plan: EmiPlan) => void;
  onRetry: () => void;
}

// Owns its own loading/failure states so a plans outage doesn't blank out the
// product details the user is still reading.
export function EmiPlanSelector({
  plans,
  isLoading,
  hasFailed,
  selectedPlanId,
  onSelectPlan,
  onRetry,
}: EmiPlanSelectorProps) {
  if (isLoading) {
    return (
      <View style={styles.list}>
        {[0, 1, 2].map((row) => (
          <Skeleton key={row} height={78} borderRadius={radius.lg} />
        ))}
      </View>
    );
  }

  if (hasFailed) {
    return (
      <ErrorState
        message="We couldn’t load EMI plans for this price. Your other details are fine."
        onRetry={onRetry}
      />
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Text variant="bodyMuted" style={styles.noPlans}>
        No EMI plans are available for this configuration.
      </Text>
    );
  }

  return (
    <View style={styles.list}>
      {plans.map((plan) => (
        <EmiPlanOption
          key={plan.id}
          plan={plan}
          selected={plan.id === selectedPlanId}
          onSelectPlan={onSelectPlan}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  noPlans: { paddingVertical: spacing.lg },
});
