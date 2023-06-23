import React, { useEffect, useState } from "react";
import BoardContext from "./BoardContext";

export default function BoardState(props) {
  // Default value for a empty board
  const boardDefaultValues = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

  // States containing the questions and solution of the sudoku board
  const [board, setBoard] = useState(boardDefaultValues);
  const [boardSol, setBoardSol] = useState(null);

  // Stores no of lives left
  const [totalNoOfLives, setTotalNoOfLives] = useState(3);
  const [livesLeft, setLivesLeft] = useState(totalNoOfLives);

  // State denoting whether the game is finished or not
  const [gameOver, setGameOver] = useState(false);

  // This will store the count of a specific numbers to fill cells
  const [fillBtnsCount, setFillBtnsCount] = useState([9, 9, 9, 9, 9, 9, 9, 9, 9]);

  // State denoting whether the board is loading
  const [loading, setLoading] = useState(true);

  // Specifies the row and col of the currently selected cell
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  // The request config
  const reqUrl = "https://sudoku-api.vercel.app/api/dosuku";
  const reqConfig = { method: "POST", headers: { "Content-Type": "application/json" } };

  // Get New Board from api
  const getNewBoard = () => {
    // Set loading to true before sending request
    setLoading(true);

    // Get raw resposnse from api call
    fetch(reqUrl, reqConfig)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
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
        setGameOver(false);
        setLivesLeft(totalNoOfLives);
      })
  }

  // This will fetch data from api and store it in state variables
  useEffect(() => {
    getNewBoard();
  }, []);

  useEffect(() => {
    if (livesLeft === 0) {
      setGameOver(true);
      alert("game over")
    }
  }, [livesLeft])

  // Update a specific cell in the grid
  const updateCell = (value) => {
    setBoard(prevBoard => {
      // Indices of currenty selected cell
      const rowIndex = focusedCell.row;
      const colIndex = focusedCell.col;

      // Check if entered value is a correct value else reduce a life
      const correctValue = boardSol[rowIndex][colIndex];
      if (value !== correctValue) return setLives(prev => prev - 1)

      // Update the value in the board
      const newBoard = [...prevBoard];
      newBoard[rowIndex][colIndex] = value;
      setBoard(newBoard);
    });
  };

  return (
    <BoardContext.Provider value={{ board, boardSol, gameOver, setGameOver, getNewBoard, loading, setLoading, livesLeft, setLivesLeft, totalNoOfLives, fillBtnsCount, setFillBtnsCount, focusedCell, setFocusedCell, updateCell }}>
      {props.children}
    </BoardContext.Provider>
  );
}
