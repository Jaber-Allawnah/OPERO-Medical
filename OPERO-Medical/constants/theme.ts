/**
 * OPERO Medical — Theme
 * Based on the official Figma design file.
 *
 * Frame : iPhone 13 & 14 (390 × 844)
 * Margin : 16  |  Gutter : 16  |  Type : Stretch
 */

// Colors

export const Colors = {
  primaryGradientStart: '#0099D6',
  primaryGradientEnd:   '#1469AF',

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

// Spacing
// All values are multiples of 4.
// Use these for margins, padding, border radius, and gaps — NOT for widths/heights.
// Widths and heights → wp() / hp()
// Fonts → RFValue()

export const Spacing = {
  xxs: 4,
  xs:  8,
  sm:  12,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

