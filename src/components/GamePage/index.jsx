import React, { useContext, useEffect, useRef } from "react";
import BoardCell from "./BoardCell";
import FillBtn from "./FillBtn";
import BoardContext from "../../context/board/BoardContext";
import ColorContext from "../../context/color/ColorContext";
import GameOverModal from "../GameOverModal";

export default function GamePage() {
  const { board, totalNoOfLives, livesLeft, fillBtnsCount } = useContext(BoardContext);
  const { focusedCell, setFocusedCell } = useContext(BoardContext);
  const { tertiaryColor } = useContext(ColorContext);
  const tableRef = useRef(null);

  // Array of numbers `1` represent alive and `0` represent dead
  const lives = Array.from({ length: totalNoOfLives }, (_, index) => index < livesLeft);

  // To use arrows to shift between different cells
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && focusedCell.row > 0) setFocusedCell(prev => ({ row: prev.row - 1, col: prev.col }));
      else if (e.key === "ArrowDown" && focusedCell.row < 8) setFocusedCell(prev => ({ row: prev.row + 1, col: prev.col }));
      else if (e.key === "ArrowLeft" && focusedCell.col > 0) setFocusedCell(prev => ({ row: prev.row, col: prev.col - 1 }));
      else if (e.key === "ArrowRight" && focusedCell.col < 8) setFocusedCell(prev => ({ row: prev.row, col: prev.col + 1 }));
    };

    tableRef.current?.addEventListener("keydown", handleKeyDown);
    return () => tableRef.current?.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell]);

  return (
    <section>
      <GameOverModal win={false}/>

      {/* Stat Bar */}
      <div className="w-full max-w-2xl mx-auto mt-[2vw]">
        <div className="flex">
          {lives.map((alive, index) => alive ? (
            <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-400 w-7 h-7">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-scaleJump text-red-400 w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>)
          )}
        </div>
      </div>

      {/* The Sudoku Board */}
      <div
        ref={tableRef}
        style={{ backgroundColor: tertiaryColor }}
        className="mt-[1vw] shadow-slate-600 shadow p-[1px] grid gap-[1px] grid-cols-9 w-full max-w-2xl mx-auto aspect-square"
      >
        {board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => (
            <BoardCell
              key={colIndex}
              value={cell}
              colIndex={colIndex}
              rowIndex={rowIndex}
            />
          ))
        })}
      </div>

      {/* The Sudoku Filler Buttons */}
      <div className="w-full max-w-2xl mx-auto mt-[2vw] grid grid-cols-9 gap-1 md:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
          <FillBtn key={index} value={number} count={fillBtnsCount[index]} />
        ))}
      </div>
    </section>
  )
} 
