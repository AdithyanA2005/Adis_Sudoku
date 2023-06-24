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
  const [fillBtnsCount, setFillBtnsCount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // State denoting whether the board is loading
  const [loading, setLoading] = useState(true);

  // Specifies the row and col of the currently selected cell
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  // This contain indices of the cell in the form [[row, col], ...]. Where the value is same as the focusedCell
  const [matchingValueIndices, setMatchingValueIndices] = useState([]);

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
        setFocusedCell({row: 0, col: 0});
      })
  };

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

  // This will fetch data from api and store it in state variables
  useEffect(() => {
    getNewBoard();
  }, []);

  // This will be executed when no of lives left changes
  useEffect(() => {
    if (livesLeft === 0) {
      setGameOver(true);
      alert("game over")
    }
  }, [livesLeft])

  // This will be executed when the boards values changes
  useEffect(() => {
    const availNoCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // This will make the array store the no of time a numbers is "used" in the table
    for (const rowIndex in board) {
      for (const colIndex in board[rowIndex]) {
        const cell = board[rowIndex][colIndex];
        if (cell !== 0) availNoCount[cell - 1] = availNoCount[cell - 1] + 1;
      }
    }

    // This will make the array store the no of time a number "can be used" again
    for (const i in availNoCount) availNoCount[i] = 9 - availNoCount[i];

    setFillBtnsCount(availNoCount);
  }, [board])

  // This will be executed when the focusedCell changes
  useEffect(() => {
    const focusedValue = board[focusedCell.row][focusedCell.col];
    const indices = [];

    if (focusedValue !== 0) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === focusedValue) {
            indices.push([i, j]);
          }
        }
      }
    };

    setMatchingValueIndices(indices);
  }, [focusedCell])

  return (
    <BoardContext.Provider value={{
      board,
      boardSol,

      gameOver,
      setGameOver,

      loading,
      setLoading,

      livesLeft,
      setLivesLeft,

      fillBtnsCount,
      setFillBtnsCount,

      focusedCell,
      setFocusedCell,

      totalNoOfLives,
      matchingValueIndices,

      getNewBoard,
      updateCell
    }}>
      {props.children}
    </BoardContext.Provider>
  );
}
