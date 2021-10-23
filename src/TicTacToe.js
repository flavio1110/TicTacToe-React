import React from "react";
import { useState } from "react/cjs/react.development";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import styles from "./TicTacToe.module.scss";

const initialPlayers = [
  { symbol: "X", score: 0 },
  { symbol: "O", score: 0 },
];

const TicTacToe = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [gameRound, setGameRound] = useState(0);

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

  const handlePlainAgain = () => {
    setGameRound(gameRound + 1);
  };

  const handleReset = () => {
    setGameRound(0);
    setPlayers(initialPlayers);
  };

  return (
    <div className={styles.container}>
      <h2>TIC-TAC-TOE</h2>
      <ScoreBoard players={players} />
      <div className={styles.actions}>
        <button onClick={handlePlainAgain}>Play again</button>
        <button onClick={handleReset}>Reset Score board</button>
      </div>
      <Board setWinner={setWinner} gameRound={gameRound} />
    </div>
  );
};

export default TicTacToe;
