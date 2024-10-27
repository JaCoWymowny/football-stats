import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProviders from '../src/providers/AppProviders';
import Layout from '../src/components/Layout/Layout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
