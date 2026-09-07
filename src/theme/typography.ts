import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  hero: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: colors.textOnPrimary,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  h2: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    color: colors.text,
  },
  bodyMuted: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.textMuted,
  },
  sectionLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  price: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
