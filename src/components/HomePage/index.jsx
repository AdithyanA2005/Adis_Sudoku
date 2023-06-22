import React from "react";
import { Link } from "react-router-dom";
import { getRandomColor } from "../../utils/colors";

export default function HomePage() {
  return (
    <section className="mt-[20vh] flex flex-col gap-10 items-center">
      {/* Start Playing Heading */}
      <h1 className="font-bagel text-center text-7xl md:text-8xl">
        {["S", "t", "a", "r", "t", " ", "P", "l", "a", "y", "i", "n", "g"].map((char) => (
          <span style={{ color: getRandomColor() }}>{char}</span>
        ))}
      </h1>

      {/* Start New Game Btn */}
      <Link to="/new-game" className="py-3 md:py-3.5 w-full max-w-md text-center text-xl md:text-2xl md:tracking-wide font-semibold rounded-lg text-slate-900 duration-200 hover:opacity-80 hover:scale-105" style={{ backgroundColor: getRandomColor() }}>
        New Game
      </Link>
    </section>
  )
}
