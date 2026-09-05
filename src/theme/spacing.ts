/**
 * Spacing, radius and shadow tokens for the 1Fi design system.
 * Base unit is 4px, matching the app's consistent 4/8/12/16 rhythm.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16, // default screen horizontal padding
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16, // default card radius
  xl: 20,
  pill: 999, // full-width pill buttons & segmented tabs
} as const;

/**
 * Soft elevation used by cards throughout the app. Cross-platform:
 * iOS uses shadow*, Android uses elevation.
 */
export const shadow = {
  card: {
    shadowColor: '#1A1633',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  floating: {
    shadowColor: '#1A1633',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
