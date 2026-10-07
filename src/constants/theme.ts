import { Colors } from './colors';

export const Typography = {
  hero: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  screenTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    color: Colors.textSecondary,
  },
  bodyBold: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    color: Colors.textMuted,
  },
  caption: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500' as const,
    color: Colors.textMuted,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
};

export const Shadows = {
  soft: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  glow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
};
