import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes';

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

const RouteList = () =>
  <Router basename={basename}>
    <div className="DefaultLayout">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/ajax">Ajax</Link>
        </li>
      </ul>
      <Routes />
    </div>
  </Router>;

export default RouteList;
