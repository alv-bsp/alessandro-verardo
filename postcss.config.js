module.exports = {
  plugins: [
    /*
     * Adds vendor prefixes to css attributes
     * https://github.com/postcss/autoprefixer
     */
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
