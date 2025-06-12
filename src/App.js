import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/Dashboard';
import Progress from './components/Progress';
import Topic from './components/Topic';
import {AuthContext} from './components/AuthContext'
import DashboardLayout from './components/layouts/DashboardLayout';


function App() {
  const { authToken } = useContext(AuthContext);
  const isLoggedIn = !!authToken;

  const browserRouter = createBrowserRouter([
    ...(!isLoggedIn ? [
      { path: "/", element: <Login /> },
      { path: "/sign-up", element: <Register /> },
      { path: "*", element: <Navigate to="/" /> }
    ] : [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/progress", element: <Progress /> },
          { path: "/topics", element: <Topic /> },
        ]
      },
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/sign-up", element: <Navigate to="/dashboard" /> },
      { path: "*", element: <Navigate to="/dashboard" /> }
    ])
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
