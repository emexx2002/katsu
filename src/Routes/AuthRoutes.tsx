import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ChangePassword from "../pages/auth/ChangePassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { RequestPasswordReset } from "../pages/auth/RequestPasswordReset";
import { IModuleRouter } from "./index";
import AuthLayout from "../pages/auth/layout/onboardingLayout";

export const AuthRouter: IModuleRouter = {
  key: "auth",
  guard: (loggedIn) => !loggedIn,
  // @ts-ignore
  layout: AuthLayout,
  routes: [
    // {
    //   index: true,
    //   element: <Navigate to="/login" />,
    // },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/request-password-reset",
      element: <RequestPasswordReset />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ],
};
