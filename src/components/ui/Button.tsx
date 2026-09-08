import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  icon,
  iconPosition = 'right',
  style,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variantStyles[variant].container,
        pressed && !isDisabled && variantStyles[variant].pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? colors.textOnPrimary : colors.primary}
            style={styles.spinner}
          />
        ) : icon && iconPosition === 'left' ? (
          <Ionicons
            name={icon}
            size={18}
            color={variantStyles[variant].labelColor}
            style={{ marginRight: spacing.xs }}
          />
        ) : null}
        <Text variant="button" color={variantStyles[variant].labelColor}>
          {label}
        </Text>
        {!loading && icon && iconPosition === 'right' ? (
          <Ionicons
            name={icon}
            size={18}
            color={variantStyles[variant].labelColor}
            style={{ marginLeft: spacing.xs }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  fullWidth: { alignSelf: 'stretch' },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  spinner: { marginRight: spacing.sm },
  disabled: { opacity: 0.45 },
});

const variantStyles: Record<
  Variant,
  { container: ViewStyle; pressed: ViewStyle; labelColor: string }
> = {
  primary: {
    container: { backgroundColor: colors.primary },
    pressed: { backgroundColor: colors.primaryPressed },
    labelColor: colors.textOnPrimary,
  },
  secondary: {
    container: {
      backgroundColor: colors.card,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    pressed: { backgroundColor: colors.primarySoft },
    labelColor: colors.primary,
  },
  ghost: {
    container: { backgroundColor: colors.transparent },
    pressed: { backgroundColor: colors.primarySoft },
    labelColor: colors.primary,
  },
};
