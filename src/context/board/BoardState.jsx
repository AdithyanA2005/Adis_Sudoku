import React, { useState } from "react";
import BoardContext from "./BoardContext";

export default function BoardState(props) {
  // State containing the values of the sudoku board
  const [grid, setGrid] = useState([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);

  // Specifies the row and col of the currently selected cell
  const [focusedCell, setFocusedCell] = useState({row: 0, col: 0});

  // Update a specific cell in the grid
  const updateCell = (rowIndex, colIndex, value) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex] = [...prevGrid[rowIndex]];
      newGrid[rowIndex][colIndex] = value;
      return newGrid;
    });
  };

  return (
    <BoardContext.Provider value={{ grid, focusedCell, setFocusedCell }}>
      {props.children}
    </BoardContext.Provider>
  );
}
