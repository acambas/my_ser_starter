const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(__dirname, '../', 'src/client/index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '/public/assets'),
    publicPath: 'assets/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      hash: true,
      template: path.join(__dirname, '../', 'src/server/views/index.ejs'),
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader',
        }),
      },
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[path]-[name]-[local]',
              },
            },
            {
              loader: 'postcss-loader',
              query: {
                sourceMap: 'inline',
                plugins: () => [autoprefixer(), precss()],
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|ttf|woff2|svg|woff)/,
        loader: 'url-loader?limit=1000',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
    ],
  },
};
