import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenProps {
  children: ReactNode;
  /** Apply default 16px horizontal padding. Turn off for full-bleed screens. */
  padded?: boolean;
  edges?: Edge[];
  style?: ViewStyle;
  backgroundColor?: string;
}

/**
 * Standard screen container: safe-area aware, app background, optional padding.
 * Used by every route so spacing and safe areas stay consistent.
 */
export function Screen({
  children,
  padded = true,
  edges = ['top'],
  style,
  backgroundColor = colors.background,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.safe, { backgroundColor }]}>
      <View style={[styles.body, padded && styles.padded, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  body: { flex: 1 },
  padded: { paddingHorizontal: spacing.lg },
});
