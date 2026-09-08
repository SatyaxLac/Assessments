import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, TypographyToken } from '@/theme';

interface TextProps extends RNTextProps {
  variant?: TypographyToken;
  color?: string;
}

export function Text({ variant = 'body', color, style, ...rest }: TextProps) {
  return (
    <RNText
      style={[typography[variant], style, color ? { color } : null]}
      {...rest}
    />
  );
}

export const textStyles = StyleSheet.create({});
