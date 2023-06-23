import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ColorContext from "../../context/color/ColorContext";

export default function Navbar() {
  const { secondaryColor } = useContext(ColorContext);

  return (
    <header className="bg-slate-800 bg-opacity-30 backdrop-blur-sm p-4 flex items-center justify-center">
      <NavLink to="/">
        <h1
          style={{ color: secondaryColor }}
          className="underline font-glitch tracking-wider text-center text-2xl md:text-3xl duration-200 hover:scale-105"
        >
          Adi's Sudoku
        </h1>
      </NavLink>
    </header>
  )
}
