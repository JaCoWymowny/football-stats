import AppProviders from '../src/providers/AppProviders';
import { RouterProvider } from 'react-router-dom';
import router from '@/providers/RouterProvider';

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
