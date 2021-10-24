import React from "react";
import BoardItem from "../BoardItem/BoardItem";
import styles from "./Board.module.scss";
import { useTicTacToeContext } from "../../TicTacToeContext";

const Board = () => {
  const { boardMap, setSelected, gameIsActive } = useTicTacToeContext();

  return (
    <div className={`${styles.Board} ${gameIsActive ? "" : styles.blink}`}>
      {boardMap.map((column) =>
        column.map((element) => (
          <BoardItem
            key={`${element.row}x${element.column}`}
            element={element}
            setSelected={!element.selected ? setSelected : null}
          />
        ))
      )}
    </div>
  );
};

export default Board;
