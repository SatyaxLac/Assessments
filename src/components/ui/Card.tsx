import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radius, shadow, spacing } from '@/theme';

interface CardProps extends ViewProps {
  padded?: boolean;
  elevated?: boolean;
}

export function Card({ padded = true, elevated = true, style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        padded && styles.padded,
        elevated && shadow.card,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  padded: { padding: spacing.lg },
});
