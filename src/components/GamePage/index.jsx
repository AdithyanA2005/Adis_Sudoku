import React, { useContext, useEffect, useRef } from "react";
import BoardCell from "./BoardCell";
import BoardContext from "../../context/board/BoardContext";

export default function GamePage() {
  const tableRef = useRef(null);
  const { grid } = useContext(BoardContext);
  const { focusedCell, setFocusedCell } = useContext(BoardContext);

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
        {grid.map((row, rowIndex) => {
          return row.map((cell, colIndex) => (
            <BoardCell
              key={colIndex}
              cellContent={cell}
              colIndex={colIndex}
              rowIndex={rowIndex}
            />
          ))
        })}
      </div>
    </section>
  )
} 
