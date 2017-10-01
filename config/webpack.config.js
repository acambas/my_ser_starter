const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // new ExtractTextPlugin({
    //   filename: 'styles.css',
    //   allChunks: true,
    // }),
  ],
  resolve: {
    // alias: {
    //   // react: 'preact-compat',
    //   // 'react-dom': 'preact-compat',
    //   // Not necessary unless you consume a module using `createClass`
    //   // 'create-react-class': 'preact-compat/lib/create-react-class',
    // },
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
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[path]-[name]-[local]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['absolute/path/a', 'absolute/path/b'],
            },
          },
        ],
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
