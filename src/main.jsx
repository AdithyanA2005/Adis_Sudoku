import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App"
import BoardState from "./context/board/BoardState";
import ColorState from "./context/color/ColorState";
import "./index.css"

{/* <React.StrictMode> */ }
{/* </React.StrictMode>, */ }
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Adis_Sudoku">
    <BoardState>
      <ColorState>
        <App />
      </ColorState>
    </BoardState>
  </BrowserRouter>
)
