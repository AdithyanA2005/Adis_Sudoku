import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import "./index.css"
import ColorState from "./context/color/ColorState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <ColorState>
          <App />
        </ColorState>
    </BrowserRouter>
  </React.StrictMode>,
)
