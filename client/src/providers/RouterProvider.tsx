import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import WelcomePage from '@/pages/welcome/Welcome';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import HomePage from '@/pages/home/Home';
import UserProfile from '@/pages/userProfile/UserProfile';
import NotFoundPage from '@/pages/404/NotFound';
import UserListPage from '@/pages/userListPage/UserListPage';
import AuthGuard from '@/features/auth/AuthGuard';
import UnAuthGuard from '@/features/auth/UnAuthGuard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Public Routes */}
      <Route path='/auth' element={<UnAuthGuard />}>
        <Route index element={<WelcomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<AuthGuard />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/users-list' element={<UserListPage />} /> {/* Temporary site for test*/}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

export default router;
