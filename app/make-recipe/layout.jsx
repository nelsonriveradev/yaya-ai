import DashboardSideBar from "../Components/DashboardSideBar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";
import { AppSidebar } from "@components/ui/app-sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[80vh]">
      <DashboardSideBar />
      <div className="flex-grow  h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
