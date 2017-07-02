const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const {
  addWebpackMiddleware,
  addIndexMiddleware,
} = require('./utils/webpackRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './server/views');

if (process.env.NODE_LOCAL) {
  winston.cli();
  winston.info('stuff is on');
  addWebpackMiddleware(app);
}

//------------------set up middleware------------------------------------
app.use('/', express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//------------------set up api routes------------------------------------

app.get('/api/test', (req, res) => {
  res.json({ value: 'ok' });
});

//------------------set up page routes------------------------------------

addIndexMiddleware(app);

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
