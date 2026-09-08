import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from './ui/Text';

interface HeroBannerProps {
  badge?: string;
  title: string;
  emphasis?: string; // italic emphasized middle line or yellow accent
  titleTail?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  showZeroPercentBadge?: boolean;
  backgroundImage?: ImageSourcePropType;
}

export function HeroBanner({
  badge,
  title,
  emphasis,
  titleTail,
  subtitle,
  actionLabel,
  onAction,
  showZeroPercentBadge,
  backgroundImage,
}: HeroBannerProps) {
  const content = (
    <View style={styles.innerContent}>
      <View style={[styles.contentLeft, backgroundImage ? styles.contentLeftWithBg : null]}>
        {badge ? (
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={11} color={colors.textOnPrimary} />
            <Text variant="caption" color={colors.textOnPrimary} style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        ) : null}

        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            {title}{' '}
            {emphasis ? (
              <Text
                style={[
                  styles.emphasisText,
                  backgroundImage ? styles.emphasisYellow : null,
                ]}
              >
                {emphasis}
              </Text>
            ) : null}
            {titleTail ? <Text style={styles.titleText}> {titleTail}</Text> : null}
          </Text>
        </View>

        {subtitle ? (
          <Text style={styles.subtitleText}>
            {subtitle}
          </Text>
        ) : null}

        {actionLabel && onAction ? (
          <Pressable
            style={styles.actionBtn}
            onPress={onAction}
            accessibilityRole="button"
          >
            <Text variant="caption" color={colors.text} style={styles.actionBtnText}>
              {actionLabel}
            </Text>
            <Ionicons name="arrow-forward" size={13} color={colors.text} />
          </Pressable>
        ) : null}
      </View>

      {!backgroundImage && showZeroPercentBadge ? (
        <View style={styles.zeroPercentBadge}>
          <View style={styles.zeroPercentInner}>
            <Text style={styles.zeroPercentNum}>0%</Text>
            <Text style={styles.zeroPercentLabel}>INTEREST</Text>
          </View>
          <Ionicons name="sparkles" size={18} color="#F5A623" style={styles.sparkleIcon} />
        </View>
      ) : null}
    </View>
  );

  if (backgroundImage) {
    return (
      <View style={styles.banner}>
        <Image
          source={backgroundImage}
          resizeMode="cover"
          style={[
            styles.bannerImage,
            Platform.OS === 'web'
              ? ({ objectPosition: 'right center', objectFit: 'cover' } as any)
              : null,
          ]}
        />
        {content}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {content}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.xl,
    backgroundColor: '#4B18C9',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 180,
    justifyContent: 'center',
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  innerContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  contentLeft: {
    flex: 1,
  },
  contentLeftWithBg: {
    maxWidth: '56%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginBottom: spacing.xs + 2,
  },
  badgeText: {
    fontWeight: '800',
    letterSpacing: 0.4,
    fontSize: 10,
  },
  titleWrap: {
    marginBottom: 4,
  },
  titleText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  emphasisText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    fontStyle: 'italic',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  emphasisYellow: {
    color: '#FFD200',
    fontStyle: 'normal',
  },
  subtitleText: {
    fontSize: 11,
    lineHeight: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginTop: 2,
    maxWidth: 220,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    gap: 4,
    marginTop: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBtnText: {
    fontWeight: '700',
    fontSize: 12,
  },
  zeroPercentBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
  zeroPercentInner: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    transform: [{ rotate: '4deg' }],
  },
  zeroPercentNum: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  zeroPercentLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1.2,
    marginTop: -2,
  },
  sparkleIcon: {
    position: 'absolute',
    top: -4,
    right: -6,
  },
});
