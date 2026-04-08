/**
 * OPERO Medical — Theme
 * Based on the official Figma design file.
 *
 * Frame : iPhone 13 & 14 (390 × 844)
 * Margin : 16  |  Gutter : 16  |  Type : Stretch
 */

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors = {
  // Primary gradient — use with expo-linear-gradient
  // start: #0099D6  →  end: #1469AF
  primaryGradientStart: '#0099D6',
  primaryGradientEnd:   '#1469AF',

  // Solid version of primary (use when gradient is not possible)
  primary: '#1469AF',       // Denim Blue

  nero:    '#292929',       // Dark text / backgrounds
  black50: 'rgba(0,0,0,0.5)', // Black at 50% opacity
  red:     '#E31C1C',       // Error / destructive actions

  white:   '#FFFFFF',
  background: '#F5F5F5',

  // Keep light/dark for nav compatibility
  light: {
    text: '#292929',
    background: '#F5F5F5',
    tint: '#1469AF',
    icon: '#292929',
    tabIconDefault: 'rgba(0,0,0,0.5)',
    tabIconSelected: '#1469AF',
  },
  dark: {
    text: '#FFFFFF',
    background: '#292929',
    tint: '#0099D6',
    icon: '#FFFFFF',
    tabIconDefault: 'rgba(255,255,255,0.5)',
    tabIconSelected: '#0099D6',
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
// From Figma spacing scale. Use with RFValue() when applying in StyleSheet.

export const Spacing = {
  xs:  8,
  sm:  16,   // also used as margin and gutter
  md:  24,
  lg:  32,
  xl:  40,
  xxl: 48,
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export const Layout = {
  frameWidth:  390,
  frameHeight: 844,
  margin:      16,
  gutter:      16,
};
