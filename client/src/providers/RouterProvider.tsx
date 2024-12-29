import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import WelcomePage from '@/pages/welcome/Welcome';
import LoginPage from '@/features/auth/pages/Login';
import RegisterPage from '@/features/auth/pages/Register';
import HomePage from '@/pages/home/Home';
import UserProfileView from '@/features/user/pages/UserProfileView';
import SettingsLayout from '@/features/user/settings/pages/SettingsLayout';
import ChangeEmail from '@/features/user/settings/pages/ChangeEmail';
import ChangePassword from '@/features/user/settings/pages/ChangePassword';
import NotFoundPage from '@/pages/404/NotFound';
import UserListPage from '@/features/user/pages/UserListPage';
import AuthGuard from '@/features/auth/guards/AuthGuard';
import UnAuthGuard from '@/features/auth/guards/UnAuthGuard';
import RootErrorBoundary from '@/pages/RootErrorBoundary';
import MatchesPage from '@/features/matches/pages/MatchesPage';
import BetPage from '@/features/bets/pages/PlaceBetPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<RootErrorBoundary />}>
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
        <Route path='/settings' element={<SettingsLayout />} errorElement={<RootErrorBoundary />}>
          <Route path='change-email' element={<ChangeEmail />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='/users-list' element={<UserListPage />} />
        <Route path='/matches' element={<MatchesPage />} />
        <Route path='/bets' element={<BetPage />} />
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
