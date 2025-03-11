import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";
import DistributorDetails from "../pages/dashboard/DistributorDetails";

export const AdminDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn) => loggedIn,
  layout: AdminLayout,
  routes: [
    {
      index: true,
      element: <Navigate to="/distributors" />,
    },
    LazyRoute(
      {
        path: "/transaction-history",
      },
      () => import("../pages/dashboard/TransactionHistory")
    ),
    LazyRoute(
      {
        path: "/distributors",
      },
      () => import("../pages/dashboard/Distribution")
    ),
    {
      path: "/distributors/:id",
      element: <DistributorDetails />
    },

    {
      path: "*",
      element: <div>Not found</div>,
    },
  ],
};
