import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'pages/Home';
import Login from 'pages/Login';

export default function App() {
  return (
    <div>
      <CssBaseline />
      <HashRouter>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </HashRouter>
    </div>
  );
}
