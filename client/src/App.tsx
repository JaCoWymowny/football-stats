import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '@/providers/AppProviders';
import Layout from '@/components/Layout';

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* tracks */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
