import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import BoardState from "./context/board/BoardState";
import ColorState from "./context/color/ColorState";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoardState>
        <ColorState>
          <App />
        </ColorState>
      </BoardState>
    </BrowserRouter>
  </React.StrictMode>,
)
