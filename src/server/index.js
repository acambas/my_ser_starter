import csshook from 'css-modules-require-hook/preset'
const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const { addWebpackMiddleware } = require('./utils/webpackRoutes');


import App from '../client/pages/App';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

const app = express();

winston.cli();

//------------------set up middleware------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//------------------set up api routes------------------------------------

app.get('/api/test', (req, res) => {
  res.json({ value: 'ok' });
});

//------------------set up page routes------------------------------------

if (process.env.NODE_ENV === 'server') {
  addWebpackMiddleware(app);
} else {
  app.use('/', express.static(path.join(__dirname, '../../public')));
}
app.get('*', (req, res) => {
  const innerHtml = ReactDOMServer.renderToString(
    <Router location={req.url} context={{}}>
      <App />
    </Router>
  );

  const indexHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
      <title>react starter</title>
      <link href="assets/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="app">
      ${innerHtml}
      </div>
    </body>
    <script type="text/javascript" src="assets/bundle.js"></script>
  </html>`;
  res.send(indexHtml);
});

//------------------set up error handler------------------------------------

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {
      sasa: 'test',
    },
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
