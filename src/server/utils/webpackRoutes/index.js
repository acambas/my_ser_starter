export default app => {
  // Step 2: Attach the dev middleware to the compiler & the server
  const webpack = require('webpack')
  const webpackConfig = require('../../../../config/webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      stats: {
        colors: true,
        chunks: false,
      },
      historyApiFallback: true,
    }),
  )

  // // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  )
}
