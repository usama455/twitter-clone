import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import "./App.css";
import Home from './pages/Home/Home';
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
import React from 'react';

const Layout = () => {

  const isAuthenticatedUser = localStorage.getItem('token')
  if (isAuthenticatedUser) {
    console.log("isAuthenticationUSer", isAuthenticatedUser)
    return (
      <div className="md:w-8/12 mx-auto">
        <Navbar />
        <Outlet></Outlet>
      </div>
    );
  } else {
    return <Navigate to="/signin" replace />
  }

};


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },

    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);


function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
