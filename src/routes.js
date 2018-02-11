// routes.js

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './components/app';
import Website from './components/website/index';

const routes = (
  <App>
    <Switch>
      <Route exact path="/" component={Website}/>
    </Switch>
  </App>
);

export default routes;
