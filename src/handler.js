import awsServerlessExpress from 'aws-serverless-express';
import app from './server';

const binaryMimeTypes = ['image/png'];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
export const express = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
