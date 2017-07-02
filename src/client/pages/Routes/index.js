import React from 'react';
import { Route } from 'react-router-dom';
import CounterPage from '../Counter';
import HomePage from '../Home';
import Ajax from '../Ajax';

const routes = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/ajax" component={Ajax} />
    </div>
  );
};

export default routes;
