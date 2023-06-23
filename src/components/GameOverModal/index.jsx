import React, { useContext } from "react";
import ColorContext from "../../context/color/ColorContext";
import BoardContext from "../../context/board/BoardContext";

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

