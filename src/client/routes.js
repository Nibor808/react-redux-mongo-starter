import requireAuth from './components/auth/require_auth';
import App from './components/app';
import Landing from './components/landing/landing';
import SignUpForm from './components/auth/signup/form_wizard_signup';
import SignInForm from './components/auth/sign_in_form';
import PasswordResetForm from './components/auth/password_reset_form';
import ResetPassword from './components/auth/reset_password';
import AdminPage from './components/admin/admin_page';
import { notFoundRoute } from './components/auth/404';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Landing,
      },
      {
        path: '/signup',
        exact: true,
        component: SignUpForm
      },
      {
        path: '/signin',
        exact: true,
        component: SignInForm
      },
      {
        path: '/passwordresetform',
        exact: true,
        component: PasswordResetForm
      },
      {
        path: '/resetpassword/:token/:id',
        exact: true,
        component: ResetPassword
      },
      {
        path: '/adminpage',
        component: requireAuth(AdminPage)
      },
      {
        path: '*',
        component: notFoundRoute
      }
    ]
  }
];
