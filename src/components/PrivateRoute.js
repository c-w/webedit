import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/userStore';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={props =>
        user != null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}
