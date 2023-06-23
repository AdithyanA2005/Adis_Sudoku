import React, { useContext, useEffect, useRef } from "react";
import BoardCell from "./BoardCell";
import FillBtn from "./FillBtn";
import BoardContext from "../../context/board/BoardContext";

export default function GamePage() {
  const tableRef = useRef(null);
  const { board, fillBtnsCount } = useContext(BoardContext);
  const { focusedCell, setFocusedCell } = useContext(BoardContext);

  // To use arrows to shift between different cells
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && focusedCell.row > 0) setFocusedCell(prev => ({ row: prev.row - 1, col: prev.col }));
      else if (e.key === 'ArrowDown' && focusedCell.row < 8) setFocusedCell(prev => ({ row: prev.row + 1, col: prev.col }));
      else if (e.key === 'ArrowLeft' && focusedCell.col > 0) setFocusedCell(prev => ({ row: prev.row, col: prev.col - 1 }));
      else if (e.key === 'ArrowRight' && focusedCell.col < 8) setFocusedCell(prev => ({ row: prev.row, col: prev.col + 1 }));
    };

    tableRef.current?.addEventListener('keydown', handleKeyDown);
    return () => tableRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [focusedCell]);

  return (
    <section>
      <div
        ref={tableRef}
        className="mt-[5vw] bg-slate-700 shadow-white shadow p-[1px] grid gap-[1px] grid-cols-9 w-full max-w-2xl mx-auto aspect-square"
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

      <div className="w-full max-w-2xl mx-auto grid grid-cols-9 gap-1 md:gap-2 mt-[2vw]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
          <FillBtn key={index} value={number} count={fillBtnsCount[index]} />
        ))}
      </div>
    </section>
  )
} 
