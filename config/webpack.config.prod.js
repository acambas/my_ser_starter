const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [path.join(__dirname, '../', 'src/client/index.js')],
  },
  output: {
    path: path.join(__dirname, '../', '/public/assets'),
    publicPath: 'assets/',
    filename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/assets/',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/assets/',
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
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
    ],
  },
}
