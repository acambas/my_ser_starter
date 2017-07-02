var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: {
    bundle: [path.join(__dirname, '../', 'src/client/index.js')],
  },
  output: {
    path: path.join(__dirname, '../', '/public/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: '../index.html',
      template: path.join(__dirname, '../', 'src/server/views/index.ejs'),
    }),
    new Visualizer(),
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
        // include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
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
                context: 'asd',
                localIdentName: '[path]-[name]-[local]-[hash:base64:5]',
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
