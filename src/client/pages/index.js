import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const extractBaseName = pathname => {
  if (pathname.includes('/dev/')) {
    return '/dev';
  } else if (pathname.includes('/qa/')) {
    return '/qa';
  } else if (pathname.includes('/prod/')) {
    return '/prod';
  } else if (pathname.includes('/frontend/')) {
    return '/frontend';
  }
  return '/';
};

const basename = extractBaseName(window.location.pathname);

const RouteList = () => (
  <Router basename={basename}>
    <App />
  </Router>
);

export default RouteList;
