import awsServerlessExpress from 'aws-serverless-express';
import app from './server';

const server = awsServerlessExpress.createServer(app);
export const express = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
