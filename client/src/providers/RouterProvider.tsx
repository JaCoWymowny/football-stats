import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout/Layout';
import WelcomePage from '../pages/welcome/Welcome';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import HomePage from '../pages/home/Home';
import NotFoundPage from '../pages/404/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Public Routes */}
      <Route path='auth'>
        <Route index element={<WelcomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      {/* Private Routes */}
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default router;
