import http from 'http';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import addWebpackMiddleware from './utils/webpackRoutes';
import renderHtml from './renderHtml';
import { delay } from '../utils/awaiting';

const app = express();

//------------------set up middleware------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  addWebpackMiddleware(app);
} else {
  app.use('/', express.static(path.join(__dirname, '../../public')));
}
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
    ],
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
  })
);
//------------------set up api routes------------------------------------

app.get('/api/test', async (req, res) => {
  await delay(100);
  res.json({ value: 'ok' });
});

//------------------set up page routes------------------------------------

app.get('*', (req, res) => {
  const context = {};
  const innerHtml = renderHtml(req.url, context);

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write(innerHtml);
    res.end();
  }
});

//------------------set up error handler------------------------------------

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

if (require.main === module) {
  const port = 3000;
  const server = http.createServer(app);
  server.listen(process.env.PORT || port, function() {
    winston.info(`Listening on ${port}`);
  });
}

module.exports = app;
