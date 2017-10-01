const path = require('path');
const webpack = require('webpack');
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
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[path]-[name]-[local]',
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|ttf|woff2|svg|woff)/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
    ],
  },
};
