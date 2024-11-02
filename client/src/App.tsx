import { RouterProvider } from 'react-router-dom';
import AppProviders from '../src/providers/AppProviders';
import router from '@/providers/RouterProvider';

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
