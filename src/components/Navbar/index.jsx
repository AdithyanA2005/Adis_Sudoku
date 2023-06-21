import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-slate-800 bg-opacity-30 backdrop-blur-sm p-4 flex items-center justify-center">
      <NavLink to="/">
        <h1 className="font-bold text-center text-3xl text-white duration-200 hover:text-pink-500 hover:scale-105">
          Adi's Sudoku
        </h1>
      </NavLink>
    </header>
  )
}
