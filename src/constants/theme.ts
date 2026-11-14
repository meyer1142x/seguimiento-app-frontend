import { Platform } from 'react-native';

const tintColorLight = '#0E2A47';                                    
const tintColorDark = '#38BDF8';                                          

export const colors = {
  light: {
    background: '#F3F7FB',
    surface: '#FFFFFF',
    text: '#0F172A',
    accent: '#0E2A47',
    accentBlue: '#2563EB',
    muted: '#64748B',
    mutedStrong: '#475569',
    mutedLight: '#94A3B8',
    description: '#334155',
    border: '#E2E8F0',
    backgroundSubtle: '#F8FAFC',
    selectedBackground: '#EAF3FF',
    selectedBorder: '#D0E4FF',
    textOnAccent: '#FFFFFF',
    success: '#16A34A',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    accent: '#38BDF8',
    accentBlue: '#38BDF8',
    muted: '#94A3B8',
    mutedStrong: '#CBD5E1',
    mutedLight: '#64748B',
    description: '#CBD5E1',
    border: '#334155',
    backgroundSubtle: '#0F172A',
    selectedBackground: '#1E293B',
    selectedBorder: '#334155',
    textOnAccent: '#0F172A',
    success: '#4ADE80',
  },
} as const;

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    tint: tintColorLight,
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorLight,
    backgroundElement: '#FFFFFF',
    backgroundSelected: colors.light.selectedBackground,
    textSecondary: colors.light.mutedStrong,
    border: '#E2E8F0',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    tint: tintColorDark,
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorDark,
    backgroundElement: '#1E293B',
    backgroundSelected: colors.dark.selectedBackground,
    textSecondary: colors.dark.mutedStrong,
    border: '#334155',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;