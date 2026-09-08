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
  actionVariant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export function StateView({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  tone = 'neutral',
  actionVariant = 'primary',
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
          variant={actionVariant}
          fullWidth={false}
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

/**
 * Failure state for a fetch. `kind` picks wording and icon that match what
 * actually went wrong — a timeout invites a retry, a missing product doesn't.
 */
export function ErrorState({
  kind = 'network',
  onRetry,
  message,
}: {
  kind?: 'network' | 'timeout' | 'notFound';
  onRetry?: () => void;
  message?: string;
}) {
  const presets = {
    network: {
      icon: 'cloud-offline-outline' as const,
      title: 'No connection',
      message: 'Check your internet and try again.',
    },
    timeout: {
      icon: 'time-outline' as const,
      title: 'This is taking a while',
      message: 'The request timed out. It may just be a slow connection.',
    },
    notFound: {
      icon: 'help-circle-outline' as const,
      title: 'Product unavailable',
      message: 'This product is no longer listed in the Marketplace.',
    },
  }[kind];

  return (
    <StateView
      icon={presets.icon}
      tone="error"
      title={presets.title}
      message={message ?? presets.message}
      actionLabel={kind === 'notFound' || !onRetry ? undefined : 'Retry'}
      onAction={kind === 'notFound' ? undefined : onRetry}
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
