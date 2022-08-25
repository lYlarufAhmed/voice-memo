import { Giving, Login, Signup } from './pages';
import DashboardRoutes from './DashboardRoutes';
import Feedback from './pages/Feedback';
import Checkout from './pages/Giving/CheckoutForm';

export const publicRoutes = [
  {
    path: '/',
    exact: true,
    redirect: '/login',
  },
  {
    path: '/login',
    exact: false,
    component: Login,
  },
  {
    path: '/signup',
    exact: false,
    component: Signup,
  },

  { path: '/giving', exact: false, component: Giving },
  // routes for checkout flow
  { path: '/checkout', exact: false, component: Checkout },
  { path: '/feedback', exact: false, component: Feedback },
];

export const privateRoutes = [{ path: '/dashboard', exact: false, component: DashboardRoutes }];
