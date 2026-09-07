import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenProps {
  children: ReactNode;
  padded?: boolean;
  edges?: Edge[];
  style?: ViewStyle;
  backgroundColor?: string;
}

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
