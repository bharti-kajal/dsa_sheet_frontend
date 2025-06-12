import { Outlet } from "react-router-dom";
import Navbar from '../layouts/Navbar';

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;