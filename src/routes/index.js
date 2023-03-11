//

import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "../layouts/main";
// import DashboardLayout from "../layouts/dashboard";
import MainLayoutDashboard from "../layouts/demo/mainLayout";
// guards
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
// config
import { PATH_AFTER_LOGIN } from "../config";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "verify",
          element: <VerifyCode />,
        },
      ],
    },

    // auth routes ...
    {
      path: "app",
      element: (
        <AuthGuard>
          <MainLayoutDashboard />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <LandingPage />, index: true },
        { path: "news-letter", element: <UnderMaintenance /> },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
//
const LandingPage = Loadable(lazy(() => import("../pages/LandingPage")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const VerifyCode = Loadable(lazy(() => import("../pages/auth/VerifyCode")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
//
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
// const NewsLetter = Loadable(lazy(() => import("../pages/newsLetter")));
//
const UnderMaintenance = Loadable(lazy(() => import("../pages/Maintenance")));
