import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import App from '../../client/pages/App';

const RouteList = (url, context = {}) => (
  <Router location={url} context={context}>
    <App />
  </Router>
);

export default RouteList;
