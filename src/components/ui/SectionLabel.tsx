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
      <Text variant="sectionLabel">{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  bar: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
});
