import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Product } from '@/data/types';
import { formatINR } from '@/services/emi';
import { colors, radius, shadow, spacing } from '@/theme';
import { Badge } from '../ui/Badge';
import { Text } from '../ui/Text';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

/**
 * Grid card for the marketplace listing: product image, brand, name, price and
 * a no-cost EMI hint. Two of these sit per row.
 */
export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatINR(product.basePrice)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.body}>
        <Text variant="caption" numberOfLines={1}>
          {product.brand}
        </Text>
        <Text variant="h3" numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text variant="caption" color={colors.textSecondary} style={styles.ratingText}>
            {product.rating?.toFixed(1)} · {product.ratingCount}
          </Text>
        </View>

        <Text variant="price" style={styles.price}>
          {formatINR(product.basePrice)}
        </Text>

        <Badge
          label={`No-cost EMI · ${product.maxNoCostTenure} mo`}
          tone="success"
          style={styles.emiBadge}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  imageWrap: {
    aspectRatio: 1,
    backgroundColor: colors.cardMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  body: { padding: spacing.md },
  name: { marginTop: 2, minHeight: 44 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  ratingText: { marginLeft: 4 },
  price: { marginTop: spacing.sm },
  emiBadge: { marginTop: spacing.sm },
});
