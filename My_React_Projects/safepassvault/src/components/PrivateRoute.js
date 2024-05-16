import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase';

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          return <Redirect to="/login" />;
        }

        if (roles && !roles.includes(currentUser.role)) {
          return <Redirect to="/unauthorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;