//

import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
// layouts
// import MainLayout from "../layouts/main";
// import DashboardLayout from "../layouts/dashboard";
// guards
// import AuthGuard from "../guards/AuthGuard";
// config
// import { PATH_AFTER_LOGIN } from "../config";
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
    { path: "/", element: <Dashboard /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "reset-password", element: <ResetPassword /> },
    { path: "verify", element: <VerifyCode /> },
    //

    { path: "*", element: <NotFound /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const VerifyCode = Loadable(lazy(() => import("../pages/auth/VerifyCode")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
//
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
