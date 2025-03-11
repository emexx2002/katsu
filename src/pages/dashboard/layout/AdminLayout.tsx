
import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";

export const AdminLayout = () => {
  return (
    <DashboardWrapper sidebar={sidebar}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
export const sidebar: SideItem[] = [
  { name: "Distributors", path: "/distributors", iconName: "distributor" },
  { name: "Transaction history", path: "/transaction-history", iconName: "transaction" },

];
