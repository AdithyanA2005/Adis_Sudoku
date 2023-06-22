import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <main className="mx-3">
        <Outlet />
      </main>
    </div>
  )
}

