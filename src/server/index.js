const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const { addWebpackMiddleware } = require('./utils/webpackRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './server/views');

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

if (process.env.NODE_LOCAL) {
  addWebpackMiddleware(app);
} else {
  app.use('/', express.static(path.join(__dirname, '../../public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
}
// addIndexMiddleware(app);

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
