import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from 'components/PrivateRoute';
import Edit from 'pages/Edit';
import Home from 'pages/Home';
import Login from 'pages/Login';

export default function App() {
  return (
    <div>
      <CssBaseline />
      <HashRouter>
        <Redirect from="/" to="/home" />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute
          exact
          path="/edit/:owner/:name/:fileName"
          component={Edit}
        />
        <Route exact path="/login" component={Login} />
      </HashRouter>
    </div>
  );
}
