import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/theme';
import { Text } from './Text';

interface SectionLabelProps {
  children: string;
  style?: ViewStyle;
}

export function SectionLabel({ children, style }: SectionLabelProps) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.bar} />
      <Text variant="sectionLabel" color={colors.primary} style={styles.labelText}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  bar: {
    width: 3.5,
    height: 16,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: spacing.sm + 2,
  },
  labelText: {
    letterSpacing: 1.2,
    fontWeight: '800',
    fontSize: 12,
  },
});
