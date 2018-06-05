/* global document */
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeView from './dumb/HomeView';
import Error404 from './dumb/Error404';

const Index = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Index />, document.getElementById('app'));
