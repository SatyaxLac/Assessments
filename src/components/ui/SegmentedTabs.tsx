import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './Text';

export interface SegmentOption {
  key: string;
  label: string;
}

interface SegmentedTabsProps {
  options: SegmentOption[];
  value: string;
  onChange: (key: string) => void;
  /** When there are more than ~3 tabs the row scrolls horizontally. */
  scrollable?: boolean;
}

/**
 * Pill-shaped segmented control matching the Shop page tabs. The active
 * segment is a white pill with a purple label and underline accent, sitting on
 * a soft tinted track.
 */
export function SegmentedTabs({ options, value, onChange, scrollable }: SegmentedTabsProps) {
  const content = useMemo(
    () =>
      options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text
              variant="body"
              color={active ? colors.primary : colors.textSecondary}
              style={active ? styles.activeLabel : styles.label}
              numberOfLines={1}
            >
              {opt.label}
            </Text>
            {active && <View style={styles.underline} />}
          </Pressable>
        );
      }),
    [options, value, onChange],
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.track, styles.trackScroll]}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.track}>{content}</View>;
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    padding: spacing.xs,
  },
  trackScroll: { alignSelf: 'flex-start' },
  segment: {
    flex: 1,
    minWidth: 96,
    paddingVertical: spacing.md - 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.card,
  },
  label: { fontWeight: '600' },
  activeLabel: { fontWeight: '700' },
  underline: {
    marginTop: 3,
    width: 22,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
