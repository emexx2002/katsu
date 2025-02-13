import clsx from "clsx";
import { NavLink, useLocation, } from "react-router-dom";
import { useRef, useContext } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { LogoutContext } from "../../context/LogoutContext";
import { sidebar } from "../../pages/dashboard/layout/AdminLayout";
import { Button } from "../../components/Button/Button";




export const DashboardSidebar = ({ items }: { items: SideItem[] }) => {
  const logout: any = useContext(LogoutContext)
  const collapsed = useSingleState(false);
  const hovered = useSingleState(false);
  const throttledHover = useRef(false);
  const isExpanded = hovered.get || !collapsed.get;
  const isCollapsed = !isExpanded;




  return (
    <aside
      className={clsx(
        "h-full md:flex text-[#637381] hidden transition-[width,padding] duration-300 flex-col overflow-y-hidden overflow-x-hidden bg-white relative",
        "w-[280px]"
      )}
    >
      <div
        className={clsx(
          " py-2 transition-[padding]",
          isCollapsed ? "" : "px-4 w-full"
        )}
      >
        <img
          src={isCollapsed ? "/images/icon-logo.svg" : "/images/logo.png"}
          className={clsx(
            isCollapsed ? "w-[72px]" : "w-[120px]",
            "transition-[width] h-auto "
          )}
          alt="yep_logo"
        />
      </div>
      <nav
        id="Sidebar-nav"
        onMouseEnter={() => {
          throttledHover.current = true;
          setTimeout(() => {
            if (throttledHover.current) {
              hovered.set(true);
            }
          }, 400);
        }}
        onMouseLeave={() => {
          hovered.set(false);
          throttledHover.current = false;
        }}
        className={clsx(
          isCollapsed ? "w-full" : "w-full",
          "flex-1 overflow-y-hidden hover:overflow-y-auto  custom-scrollbar"
        )}
      >

        <SidebarItem />


        <div className="absolute w-full bottom-6 pl-4 gap-3.5 flex items-center">
          <div className="w-full max-w-sm p-4 space-y-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stack-63pbh6LwlKl2RLv58YTDx6BdWPAazn.png"
                  alt="Hudson Alvarez"
                  className="rounded-full h-full w-full object-cover"
                />
              </div>
              <span className="text-black font-medium">Hudson Alvarez</span>
            </div>
            <Button label="Logout" className="w-full justify-center font-semibold text-center !bg-[#FF563014] !text-[#B71D18]" onClick={logout.toggleLogout} />

          </div>
        </div>
      </nav>
    </aside>
  );
};

export interface SideItem {
  name: string;
  path?: string;
  iconName?: string;
  children?: SideItem[];
}

export const SidebarItem = ({
  className
}: {
  className?: any;
}) => {
  // const { pathname } = useLocation()
  return (
    <div className="mb-6">
    { sidebar.map((items: any, index: number) =>
      <div className="py-2 w-full px-3">

        <NavLink to={items.path ?? "/"} className={({ isActive }) =>
          clsx(
            "flex items-center gap-3 text-[#5A5C5E] h-[44px] px-3 py-2",
            isActive ? "bg-[#1977F214] text-[#1977F2]  rounded-md " : ""

          )
        }>
          {({ isActive }) => <>
            <div
              className={clsx(
                "w-5 h-5",
                isActive ? "gradient-icon" : "invert-[100%] brightness-0"
              )}

              style={
                isActive
                  ? {
                    WebkitMaskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                    maskImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    background: "linear-gradient(90deg, #23454F 0%, #222834 0%, #0066FF 69.76%, #1EB7CF 100%)",
                    WebkitMaskSize: "cover",
                    maskSize: "cover",
                  }
                  : {
                    backgroundImage: `url(/sidebar-icons/${items.iconName}.svg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    filter: "invert(100%) brightness(0)", // Make the icon grayscale when inactive
                  }
              }
             
            ></div> <h3 className={clsx("capitalize", isActive ? " font-semibold " : "")}>{items.name}</h3>
          </>}

        </NavLink>

      </div>
    )}

  </div>


  );
};
