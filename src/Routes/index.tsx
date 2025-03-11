import { Suspense, useEffect, useState } from "react";
import { RouteObject, useRoutes, Navigate, useLocation } from "react-router-dom";
import { AuthRouter } from "./AuthRoutes";
import { AdminDashRouter } from "./DashboardRoutes";
import { AppFallback } from "./Layout";
import { useAuth } from "../zustand/auth.store";
import DistributorDetails from "../pages/dashboard/DistributorDetails";

export interface IModuleRouter {
  guard: (loggedIn: boolean) => boolean;
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}

const ModuleRouters: Array<IModuleRouter> = [AuthRouter, AdminDashRouter];

export const AppRouter = () => {
  const [router, setRouter] = useState<IModuleRouter | null>(null);
  const isLoggedIn: boolean = useAuth(s => !!s.token)
  // const isLoggedIn: boolean = true;
  useEffect(() => {
    const routeToRender = ModuleRouters.find((rtr) => rtr.guard(isLoggedIn));
    if (routeToRender) {
      setRouter(routeToRender);
    } else {
      setRouter(null);
    }
  }, [isLoggedIn]);

  const Layout = router?.layout ?? AppFallback;
  const routerView = useRoutes([
    {
      element: <Layout />,
      children: router?.routes ?? [],
    },
  ]);

  if (!router) {
    return <AppFallback screen />;
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      {routerView}
    </Suspense>
  );
};
