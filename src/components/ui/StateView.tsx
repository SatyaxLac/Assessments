import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '@/theme';
import { Button } from './Button';
import { Text } from './Text';

interface StateViewProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'neutral' | 'error';
  style?: ViewStyle;
}

/**
 * Shared empty / error state block: centered illustration bubble, title,
 * message and an optional CTA. Mirrors the app's "NOTHING DUE YET" /
 * "CHECK ELIGIBILITY" empty screens.
 */
export function StateView({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  tone = 'neutral',
  style,
}: StateViewProps) {
  const accent = tone === 'error' ? colors.danger : colors.primary;
  const bubbleBg = tone === 'error' ? colors.dangerSoft : colors.primarySoft;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bubble, { backgroundColor: bubbleBg }]}>
        <Ionicons name={icon} size={30} color={accent} />
      </View>
      <Text variant="h3" style={styles.title}>
        {title}
      </Text>
      {message ? (
        <Text variant="bodyMuted" style={styles.message}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant={tone === 'error' ? 'primary' : 'secondary'}
          fullWidth={false}
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

/** Convenience wrapper for the common "failed to load" case. */
export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  return (
    <StateView
      icon="cloud-offline-outline"
      tone="error"
      title="Something went wrong"
      message={message ?? 'We couldn’t load this right now. Please try again.'}
      actionLabel={onRetry ? 'Retry' : undefined}
      onAction={onRetry}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  bubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { textAlign: 'center', marginBottom: spacing.xs },
  message: { textAlign: 'center', marginBottom: spacing.lg, maxWidth: 300 },
  action: { marginTop: spacing.xs, paddingHorizontal: spacing.xxxl },
});
