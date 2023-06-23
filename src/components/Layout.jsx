import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ColorContext from "../context/color/ColorContext";

export default function Layout() {
  const { primaryColor } = useContext(ColorContext);

  return (
    <div style={{ borderColor: primaryColor }} className="border-4 bg-black h-screen">
      <Navbar />
      <main className="mx-3">
        <Outlet />
      </main>
    </div>
  )
}

