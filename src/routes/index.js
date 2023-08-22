import { Navigate } from 'react-router';
import * as React from 'react';

import Login from '../pages/login';
import ManageWater from '../pages/manage_water';
import ManageWaterForm from '../pages/manage_water/form';
import Base from '../pages/base';

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
    {
      path: 'manage-water',
      element: <Base />,
      children: [
        {
          path: '',
          element: <ManageWater />
        },
        {
          path: 'create',
          element: <ManageWaterForm />
        },
        {
          path: 'edit/:id',
          element: <ManageWaterForm />
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to='/' />
    }
  ]
}

export default Routes;