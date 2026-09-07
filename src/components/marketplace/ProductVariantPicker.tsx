import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Variant } from '@/data/types';
import { colors, radius, spacing } from '@/theme';
import { Text } from '../ui/Text';

interface ProductVariantPickerProps {
  variants: Variant[];
  selectedVariantIds: Record<string, string>;
  onSelectVariant: (group: string, variantId: string) => void;
}

export function ProductVariantPicker({
  variants,
  selectedVariantIds,
  onSelectVariant,
}: ProductVariantPickerProps) {
  const variantGroups = useMemo(() => {
    const grouped = new Map<string, Variant[]>();
    for (const variant of variants) {
      const options = grouped.get(variant.group) ?? [];
      options.push(variant);
      grouped.set(variant.group, options);
    }
    return Array.from(grouped.entries());
  }, [variants]);

  return (
    <View style={styles.container}>
      {variantGroups.map(([group, options]) => (
        <View key={group} style={styles.group}>
          <Text variant="bodyMuted" style={styles.groupLabel}>
            {group}
          </Text>
          <View style={styles.chips}>
            {options.map((option) => {
              const active = selectedVariantIds[group] === option.id;
              const disabled = !option.inStock;
              return (
                <Pressable
                  key={option.id}
                  disabled={disabled}
                  onPress={() => onSelectVariant(group, option.id)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active, disabled }}
                  style={[
                    styles.chip,
                    active && styles.chipActive,
                    disabled && styles.chipDisabled,
                  ]}
                >
                  <Text
                    variant="body"
                    color={active ? colors.primary : colors.textSecondary}
                    style={[styles.chipLabel, disabled && styles.chipLabelDisabled]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  group: { gap: spacing.sm },
  groupLabel: { fontWeight: '600' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipDisabled: { backgroundColor: colors.background, borderColor: colors.border },
  chipLabel: { fontWeight: '600' },
  chipLabelDisabled: { color: colors.textMuted, textDecorationLine: 'line-through' },
});
