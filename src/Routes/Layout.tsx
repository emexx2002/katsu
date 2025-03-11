import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

export const LayoutOutlet = () => {
  return (
    <Suspense fallback={<AppFallback />}>
      <Outlet />
    </Suspense>
  );
};

export const AppFallback = ({ screen }: { screen?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${screen ? 'h-screen' : 'h-full'}`}
      style={{ minHeight: screen ? '100vh' : '400px' }}
    >
      <div className="text-gray-500 text-lg">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"></div>
        <p className="text-center">Loading...</p>
      </div>
    </div>
  );
};
