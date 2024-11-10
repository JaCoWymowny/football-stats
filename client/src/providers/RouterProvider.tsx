import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import WelcomePage from '@/pages/welcome/Welcome';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import HomePage from '@/pages/home/Home';
import UserProfileView from '@/pages/userProfile/UserProfileView';
import SettingsLayout from '@/features/user/settings/pages/SettingsLayout';
import ChangeEmail from '@/features/user/settings/pages/ChangeEmail';
import ChangePassword from '@/features/user/settings/pages/ChangePassword';
import NotFoundPage from '@/pages/404/NotFound';
import UserListPage from '@/pages/userListPage/UserListPage';
import AuthGuard from '@/features/auth/guards/AuthGuard';
import UnAuthGuard from '@/features/auth/guards/UnAuthGuard';

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
        <Route path='/profile/:id' element={<UserProfileView />} />
        <Route path='/settings' element={<SettingsLayout />}>
          <Route path='change-email' element={<ChangeEmail />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='/users-list' element={<UserListPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      // @ts-expect-error TS2322: Type 'boolean' is not assignable to type 'VoidOrUndefinedOnly'.
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
