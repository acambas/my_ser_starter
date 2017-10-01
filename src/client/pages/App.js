import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';

const RouteList = () => (
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
);

export default RouteList;
