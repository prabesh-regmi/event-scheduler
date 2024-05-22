import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
