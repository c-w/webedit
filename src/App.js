import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from 'components/PrivateRoute';
import Layout from 'components/Layout';
import Edit from 'pages/Edit';
import Home from 'pages/Home';
import Login from 'pages/Login';

const Index = () => <Redirect to="/home" />;

export default function App() {
  return (
    <div>
      <CssBaseline />
      <HashRouter>
        <Layout>
          <Route exact path="/" component={Index} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/edit/:owner/:name/:fileName"
            component={Edit}
          />
          <Route exact path="/login" component={Login} />
        </Layout>
      </HashRouter>
    </div>
  );
}
