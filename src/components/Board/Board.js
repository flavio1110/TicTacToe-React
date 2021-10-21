import React, { useState, useEffect } from "react";
import BoardItem from "../BoardItem/BoardItem";
import styles from "./Board.module.scss";
import {
  getInitialBoard,
  cloneBoardMap,
  isThereAWinner,
} from "../../Services/BoardMapServices";

const Board = ({ setWinner, gameRound }) => {
  const firstPlayerSymbol = "O";
  const secondPlayerSymbol = "X";

  const [currentSymbol, setCurrentSymbol] = useState(firstPlayerSymbol);
  const [boardMap, setBoardMap] = useState(getInitialBoard());
  const [boardDisabled, setBoardDisabled] = useState(false);

  useEffect(() => {
    setBoardMap(getInitialBoard());
    setCurrentSymbol(firstPlayerSymbol);
    setBoardDisabled(false);
  }, [gameRound]);

  const setSelected = (element) => {
    if (element.selected || boardDisabled) return;

    const newMap = cloneBoardMap(boardMap);
    const selectedElement = newMap[element.row][element.column];

    selectedElement.currentSymbol = currentSymbol;
    selectedElement.selected = true;
    const someoneWon = isThereAWinner(newMap);
    if (someoneWon) {
      setWinner(currentSymbol);
      setBoardDisabled(true);
    } else {
      setCurrentSymbol(
        currentSymbol === secondPlayerSymbol
          ? firstPlayerSymbol
          : secondPlayerSymbol
      );
    }

    setBoardMap(newMap);
  };

  return (
    <div className={`${styles.Board} ${boardDisabled ? styles.blink : ""}`}>
      {boardMap.map((column) =>
        column.map((element) => (
          <BoardItem
            key={`${gameRound}-${element.row}x${element.column}`}
            element={element}
            setSelected={!element.selected ? setSelected : null}
          />
        ))
      )}
    </div>
  );
};

export default Board;
