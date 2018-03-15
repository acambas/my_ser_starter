import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './_Layout';

const extractBaseName = pathname => {
  if (pathname.includes('/dev/')) {
    return '/dev';
  } else if (pathname.includes('/prod/')) {
    return '/prod';
  } else if (pathname.includes('/qa/')) {
    return '/qa';
  }
  return '/';
};

const basename = extractBaseName(window.location.pathname);

const RouteList = () => (
  <Router basename={basename}>
    <Layout />
  </Router>
);

export default RouteList;
