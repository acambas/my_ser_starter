import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import CounterPage from '../Counter'
import HomePage from '../Home'
import Ajax from '../Ajax'
import NoMatch from '../NoMatch'

const Layout = () => (
  <div>
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
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/ajax" component={Ajax} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Layout
