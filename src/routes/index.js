import { Navigate } from 'react-router';
import * as React from 'react';

import Login from '../pages/login';

const Routes = () => {
  return [
    {
      path: '',
      element: <Navigate to="/login" />
    },
    {
      path: 'login',
      name: 'login',
      element: <Login />
    },
  ]
}

export default Routes;