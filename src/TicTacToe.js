import React from "react";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import styles from "./TicTacToe.module.scss";
import { useTicTacToeContext } from "./TicTacToeContext";

const TicTacToe = () => {
  const { resetScoreBoard, plainAgain } = useTicTacToeContext();
  const handlePlainAgain = () => plainAgain();
  const handleReset = () => resetScoreBoard();

  return (
    <div className={styles.container}>
      <h2>TIC-TAC-TOE</h2>
      <ScoreBoard />
      <div className={styles.actions}>
        <button onClick={handlePlainAgain}>Play again</button>
        <button onClick={handleReset}>Reset Score board</button>
      </div>
      <Board />
    </div>
  );
};

export default TicTacToe;
