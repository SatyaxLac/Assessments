// Sampled from the existing 1Fi screens. Single source of truth for color —
// components reference these instead of hardcoding hex values.
export const colors = {
  // Brand
  primary: '#6D3EF2', // 1Fi purple — buttons, active tab, links, accents
  primaryDark: '#4B18C9',
  primaryPressed: '#5B31D6',
  primarySoft: '#EFEAFE', // tinted purple surfaces (icon chips, soft pills)

  // Hero / promo gradients (deep indigo -> violet)
  gradientStart: '#5A2CE0',
  gradientEnd: '#3A1B8C',

  // Surfaces
  background: '#F3F3F6', // app canvas
  card: '#FFFFFF',
  cardMuted: '#FAFAFC',
  border: '#ECECF1',

  // Text
  text: '#161622', // headings / primary
  textSecondary: '#5C5C6B',
  textMuted: '#9A9AA8', // captions, section sublabels
  textOnPrimary: '#FFFFFF',

  // Status
  success: '#1FB871',
  successSoft: '#E4F7EF',
  danger: '#E5484D',
  dangerSoft: '#FCEBEC',
  warning: '#F5A623',
  warningSoft: '#FEF3E0',

  // Utility
  skeleton: '#E7E7EE',
  overlay: 'rgba(20, 20, 34, 0.45)',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
