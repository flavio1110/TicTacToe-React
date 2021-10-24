import { createContext, useContext, useState, useCallback } from "react";
import {
  getInitialBoard,
  cloneBoardMap,
  isThereAWinner,
} from "./Services/BoardMapServices";

const initialPlayers = [
  { symbol: "X", score: 0 },
  { symbol: "O", score: 0 },
];

const Context = createContext();

const TicTacToeProvider = ({ children }) => {
  const firstPlayerSymbol = "O";
  const secondPlayerSymbol = "X";

  const [currentSymbol, setCurrentSymbol] = useState(firstPlayerSymbol);
  const [boardMap, setBoardMap] = useState(getInitialBoard());
  const [gameIsActive, setGameIsActive] = useState(true);
  const [players, setPlayers] = useState(initialPlayers);

  const plainAgain = useCallback(() => reset(), []);
  const resetScoreBoard = useCallback(() => reset(true), []);

  const reset = (resetScore) => {
    setCurrentSymbol(firstPlayerSymbol);
    setBoardMap(getInitialBoard());
    setGameIsActive(true);

    if (resetScore) setPlayers(initialPlayers);
  };

  const setWinner = (symbol) => {
    const newPlayers = players.map((p) => {
      return { ...p };
    });

    const player = newPlayers.find((p) => p.symbol === symbol);

    if (player) {
      player.score += 1;
      setPlayers(newPlayers);
    }
  };

  const setSelected = (element) => {
    if (element.selected || !gameIsActive) return;

    const newMap = cloneBoardMap(boardMap);
    const selectedElement = newMap[element.row][element.column];

    selectedElement.currentSymbol = currentSymbol;
    selectedElement.selected = true;
    const someoneWon = isThereAWinner(newMap);
    if (someoneWon) {
      setWinner(currentSymbol);
      setGameIsActive(false);
      setBoardMap(getInitialBoard());
    } else {
      setCurrentSymbol(
        currentSymbol === secondPlayerSymbol
          ? firstPlayerSymbol
          : secondPlayerSymbol
      );
    }

    setBoardMap(newMap);
  };

  const value = {
    resetScoreBoard,
    plainAgain,
    setSelected,
    players,
    boardMap,
    gameIsActive,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useTicTacToeContext = () => useContext(Context);

export { TicTacToeProvider, useTicTacToeContext };
