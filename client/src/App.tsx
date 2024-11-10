import { RouterProvider } from 'react-router-dom';
import AppProviders from '../src/providers/AppProviders';
import router from '@/providers/RouterProvider';
import React from 'react';

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
