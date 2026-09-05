export { colors } from './colors';
export type { ColorToken } from './colors';
export { spacing, radius, shadow } from './spacing';
export { typography } from './typography';
export type { TypographyToken } from './typography';

import { colors } from './colors';
import { spacing, radius, shadow } from './spacing';
import { typography } from './typography';

/** Convenience bundle for consumers that want the whole theme object. */
export const theme = { colors, spacing, radius, shadow, typography } as const;
