module.exports = {
  darkMode: false,
  content: ['./views/**/*.pug', './app/**/*.js'],
  theme: {
    /**
     * COLOR PALETTE
     * Limit the available colors
     */
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      accent: {
        DEFAULT: '#01A3FF',
      },
    },
    /**
     * CONTAINER OPTIONS
     * Auto-apply .mx-auto
     */
    container: (theme) => ({
      center: true,
      padding: {
        DEFAULT: theme('spacing.0'),
        md: theme('spacing.8'),
      },
    }),
    /**
     * FONT FAMILY
     * Custom font stack
     */
    fontFamily: {
      Inter: '"Inter", -apple-system, "BlinkMacSystemFont", Helvetica, Arial',
      TrispaceExpanded:
        '"Trispace Expanded", -apple-system, "BlinkMacSystemFont", Helvetica, Arial',
      TrispaceSemiCondensed:
        '"Trispace SemiCondensed", -apple-system, "BlinkMacSystemFont", Helvetica, Arial',
    },

    extend: {
      lineHeight: {
        zero: '0',
      },
    },
  },
  plugins: [],
};
