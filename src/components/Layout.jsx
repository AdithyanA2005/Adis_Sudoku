import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { getRandomColor } from "../utils/colors";

export default function Layout() {
  return (
    <div style={{borderColor: getRandomColor()}} className="border-4 bg-black h-screen">
      <Navbar />
      <main className="mx-3">
        <Outlet />
      </main>
    </div>
  )
}

