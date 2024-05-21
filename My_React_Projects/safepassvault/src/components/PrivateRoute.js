import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

function PrivateRoute({ roles }) {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(auth.currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
