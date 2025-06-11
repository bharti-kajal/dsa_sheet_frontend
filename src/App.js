import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/auth/Dashboard';
import Progress from './components/Progress';
import Topic from './components/Topic';

import DashboardLayout from './components/layouts/DashboardLayout';
import { isAuthenticated } from './utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const browserRouter = createBrowserRouter([
    ...(!isLoggedIn ? [
      { path: "/", element: <Login onLogin={() => setIsLoggedIn(true)} /> },
      { path: "/sign-up", element: <Register /> },
      { path: "*", element: <Navigate to="/" /> }
    ] : [
      {
        element: <DashboardLayout onLogout={() => setIsLoggedIn(false)} />,
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
