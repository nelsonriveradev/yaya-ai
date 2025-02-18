import DashboardSideBar from "../Components/DashboardSideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[80vh]">
      <DashboardSideBar />
      <div className="flex-grow  h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
