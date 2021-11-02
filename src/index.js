import React from "react";
import ReactDOM from "react-dom";
import TicTacToe from "./TicTacToe";
import { TicTacToeProvider } from "./TicTacToeContext";

ReactDOM.render(
  <React.StrictMode>
    <TicTacToeProvider>
      <TicTacToe />
    </TicTacToeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
