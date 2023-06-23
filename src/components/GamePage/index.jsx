import React, { useContext } from "react";
import BoardCell from "./BoardCell";
import BoardContext from "../../context/board/BoardContext";

export default function GamePage() {
  const { grid } = useContext(BoardContext);

  return (
    <section className="">
      <div className="mt-[5vw] bg-slate-700 shadow-white shadow p-[1px] grid gap-[1px] grid-cols-9 w-full max-w-2xl mx-auto aspect-square">
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
