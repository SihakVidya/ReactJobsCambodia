import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Toaster />
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
