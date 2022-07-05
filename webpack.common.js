const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dirApp = path.resolve(__dirname, 'app');
const dirShared = path.resolve(__dirname, 'shared');
const dirStyles = path.resolve(__dirname, 'styles');

module.exports = {
  entry: [
    path.resolve(dirApp, 'index.js'),
    path.resolve(dirStyles, 'index.css'),
  ],
  resolve: {
    modules: ['node_modules', dirApp, dirShared, dirStyles],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [dirShared],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        include: dirApp,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(glsl|frag|vert)$/,
        type: 'asset/source',
        exclude: /node_modules/,
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    clean: true,
  },
};
