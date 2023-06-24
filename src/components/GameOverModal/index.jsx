import React, { useContext } from "react";
import ColorContext from "../../context/color/ColorContext";
import BoardContext from "../../context/board/BoardContext";
import { NavLink } from "react-router-dom";

export default function GameOverModal({ win }) {
  const { primaryColor, tertiaryColor } = useContext(ColorContext);
  const { getNewBoard, gameOver } = useContext(BoardContext);

  return (
    <>
      {gameOver && (
        <div className="fixed z-50 inset-0 backdrop-filter backdrop-blur-sm">
          <div
            style={{ backgroundColor: primaryColor }}
            className="relative rounded-lg p-8 shadow-slate-400 shadow-md mt-10 md:mt-20 mx-auto w-[95%] sm:max-w-2xl lg:max-w-3xl"
          >
            {/* Win / Lose Heading */}
            <h2 className="text-3xl font-bold mb-4">
              {win
                ? "You Win!"
                : "Game Over"
              }
            </h2>

            {/* Win / Loose Message */}
            <p className="mb-4 text-md">
              {win
                ? "Congratulations, you won the game!"
                : "Better luck next time!"}
            </p>

            {/* X btn: Back to homepage */}
            <NavLink to="/" className="absolute top-4 right-4 text-gray-800 hover:text-gray-600" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </NavLink>

            {/* New Game Button */}
            <button
              onClick={getNewBoard}
              style={{ backgroundColor: tertiaryColor }}
              className="hover:opacity-90 text-white font-bold py-2 px-6 rounded"
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </>
  );
};

