const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.common.js');

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    static: ['./public'],
    watchFiles: ['./views'],
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
