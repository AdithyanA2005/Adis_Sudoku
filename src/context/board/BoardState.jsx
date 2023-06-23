import React, { useEffect, useState } from "react";
import BoardContext from "./BoardContext";

export default function BoardState(props) {
  // Default value for a empty board
  const boardDefaultValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

  // States containing the questions and solution of the sudoku board
  const [board, setBoard] = useState(boardDefaultValues);
  const [boardSol, setBoardSol] = useState(null);

  // State denoting whether the board is loading
  const [loading, setLoading] = useState(true);

  // Specifies the row and col of the currently selected cell
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  // This will fetch data from api and store it in state variables
  useEffect(() => {
    const reqUrl = 'https://sudoku-api.vercel.app/api/dosuku';
    const reqConfig = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

    // Set loading to true before sending request
    setLoading(true);

    // Get raw resposnse from api call
    fetch(reqUrl, reqConfig)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((resJson) => {
        // Extract necessary data from response
        const question = resJson.newboard.grids[0].value;
        const solution = resJson.newboard.grids[0].solution;

        setBoard(question);
        setBoardSol(solution);
      })
      .catch((err) => {
        setBoard(boardDefaultValues);
        setBoardSol(null);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <BoardContext.Provider value={{ board, boardSol, loading, setLoading, focusedCell, setFocusedCell }}>
      {props.children}
    </BoardContext.Provider>
  );
}
