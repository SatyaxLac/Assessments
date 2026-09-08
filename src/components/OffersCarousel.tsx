import { useEffect, useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text } from './ui/Text';
import { colors, radius, spacing } from '@/theme';

export interface OfferItem {
  id: string;
  category: string;
  title: string;
  tag: string;
  image: any;
  accent: string;
  brand: string;
  link?: string;
}

const OFFERS: OfferItem[] = [
  {
    id: 'suzuki',
    category: 'ADVENTURE RIDE DEAL',
    title: 'Upgrade to Your next\nAdventerous Ride',
    tag: 'Adventure on 60m EMIs',
    image: require('../../assets/offers/suzuki.png'),
    accent: '#FFD200',
    brand: 'SUZUKI',
    link: '/shop',
  },
  {
    id: 'wakefit',
    category: 'FURNITURE | MATTRESS | HOME DECOR',
    title: 'Dream homes to\nsweet dreams',
    tag: 'Comfort on 12m no-cost EMIs',
    image: require('../../assets/offers/wakefit.png'),
    accent: '#C4B5FD',
    brand: 'wakefit',
    link: '/shop',
  },
  {
    id: 'apple',
    category: 'FLAGSHIP MOBILES',
    title: 'Experience power &\npro elegance',
    tag: 'No-cost EMI upto 24 months',
    image: require('../../assets/offers/iphone.png'),
    accent: '#F59E0B',
    brand: 'Apple',
    link: '/marketplace/product/iphone-15',
  },
  {
    id: 'electronics',
    category: 'SMART ELECTRONICS',
    title: 'Smart living with\nzero down payment',
    tag: 'Flexible tenure upto 36m',
    image: require('../../assets/offers/electronics.png'),
    accent: '#38BDF8',
    brand: '1Fi Store',
    link: '/shop',
  },
];

export function OffersCarousel() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth <= 0) return;
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / containerWidth);
    if (index !== activeIndex && index >= 0 && index < OFFERS.length) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (containerWidth <= 0) return;
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % OFFERS.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * containerWidth,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeIndex, containerWidth]);

  const goToSlide = (idx: number) => {
    if (containerWidth <= 0) return;
    scrollRef.current?.scrollTo({
      x: idx * containerWidth,
      animated: true,
    });
    setActiveIndex(idx);
  };

  return (
    <View style={styles.wrap} onLayout={handleLayout}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[styles.scrollView, { width: containerWidth || '100%' }]}
      >
        {OFFERS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => item.link && router.push(item.link as any)}
            style={[styles.slide, { width: containerWidth || 360 }]}
          >
            <View style={styles.card}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={[
                  styles.cardImage,
                  Platform.OS === 'web'
                    ? ({ objectPosition: 'right center', objectFit: 'cover' } as any)
                    : null,
                ]}
              />

              {/* Gradient overlay to ensure maximum text readability */}
              <LinearGradient
                colors={['rgba(0,0,0,0.72)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />

              <View style={styles.content}>
                <Text variant="caption" style={[styles.category, { color: item.accent }]}>
                  {item.category}
                </Text>

                <Text style={styles.title}>{item.title}</Text>

                <View style={styles.pill}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  <Text style={styles.pillText}>{item.tag}</Text>
                </View>
              </View>

              <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{item.brand}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Interactive indicator dots */}
      <View style={styles.dotsRow}>
        {OFFERS.map((_, idx) => (
          <Pressable
            key={idx}
            onPress={() => goToSlide(idx)}
            hitSlop={8}
            style={[styles.dot, idx === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: spacing.sm,
  },
  scrollView: {
    overflow: 'hidden',
    borderRadius: radius.xl,
  },
  slide: {
    height: 185,
  },
  card: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    zIndex: 1,
    maxWidth: '65%',
    gap: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 23,
    letterSpacing: -0.3,
    marginTop: 2,
    marginBottom: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 4,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brandBadge: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: spacing.sm + 3,
    paddingVertical: 3,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 1,
  },
  brandText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 16,
  },
});
