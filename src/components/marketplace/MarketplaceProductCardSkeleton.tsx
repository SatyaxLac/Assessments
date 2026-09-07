import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Skeleton } from '../ui/Skeleton';

export function MarketplaceProductCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton width="100%" height={150} borderRadius={0} />
      <View style={styles.body}>
        <Skeleton width="40%" height={10} />
        <Skeleton width="80%" height={16} style={styles.gap} />
        <Skeleton width="50%" height={20} style={styles.gap} />
        <Skeleton width="60%" height={18} borderRadius={radius.pill} style={styles.gap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  body: { padding: spacing.md, gap: spacing.xs },
  gap: { marginTop: spacing.xs },
});
