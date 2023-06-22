import React from "react";
import { NavLink } from "react-router-dom";
import { getRandomColor } from "../../utils/colors";

export default function Navbar() {
  return (
    <header className="bg-slate-800 bg-opacity-30 backdrop-blur-sm p-4 flex items-center justify-center">
      <NavLink to="/">
        <h1 className="underline font-glitch tracking-wider text-center text-2xl md:text-3xl duration-200 hover:scale-105" style={{color: getRandomColor()}}>
          Adi's Sudoku
        </h1>
      </NavLink>
    </header>
  )
}
