import awsServerlessExpress from 'aws-serverless-express';
import app from './server';

const server = awsServerlessExpress.createServer(app);
export const express = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);

var zlib = require('zlib');

export const gzip = (event, context, callback) => {
  console.log(JSON.stringify(event));
  var resp = zlib.gzipSync(JSON.stringify(event));
  callback(null, {
    body: resp.toString('base64'),
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
    isBase64Encoded: true,
  });
};
