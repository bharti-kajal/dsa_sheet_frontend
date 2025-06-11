import { Outlet } from "react-router-dom";
import Navbar from '../layouts/Navbar'

const DashboardLayout = ({ onLogout }) => {
  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
