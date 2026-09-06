import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, TypographyToken } from '@/theme';

interface TextProps extends RNTextProps {
  variant?: TypographyToken;
  color?: string;
}

/**
 * Typography-aware Text. Pass a `variant` token from the theme instead of
 * ad-hoc font styling so text stays consistent across the app.
 */
export function Text({ variant = 'body', color, style, ...rest }: TextProps) {
  return (
    <RNText
      style={[typography[variant], color ? { color } : null, style]}
      {...rest}
    />
  );
}

export const textStyles = StyleSheet.create({});
