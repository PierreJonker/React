import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        auth.currentUser ? (
          roles && !roles.includes(auth.currentUser.role) ? (
            <Navigate to="/unauthorized" />
          ) : (
            <Component />
          )
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;