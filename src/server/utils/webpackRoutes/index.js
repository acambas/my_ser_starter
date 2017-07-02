const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../../../../config/webpack.config');

module.exports = app => {
  const compiler = webpack(webpackConfig);
  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(
    require('webpack-dev-middleware')(compiler, {
      // publicPath: webpackConfig.output.publicPath,
      hot: true,
      filename: 'bundle.js',
      publicPath: '/assets/',
      stats: {
        colors: true,
        chunks: false,
      },
      historyApiFallback: true,
    })
  );

  // // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );

  app.get('/', (req, res, next) => {
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
};
