import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CounterPage from '../Counter';
import HomePage from '../Home';
import Ajax from '../Ajax';
import NoMatch from '../NoMatch';

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/counter" component={CounterPage} />
        <Route path="/ajax" component={Ajax} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default routes;
