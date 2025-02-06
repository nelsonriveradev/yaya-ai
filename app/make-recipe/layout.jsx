import DashboardSideBar from "../Components/DashboardSideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[89vh] overflow-hidden">
      <DashboardSideBar />
      <div className="flex-grow overflow-y-auto h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
