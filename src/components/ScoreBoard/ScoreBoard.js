import React from "react";
import styles from "./ScoreBoard.module.scss";

function ScoreBoard({ players }) {
  return (
    <div className={styles.scoreBoard}>
      {players.map((p) => (
        <div key={p.symbol}>
          <span className={styles.player}>Player {p.symbol}</span>:
          <span className={styles.score}>{p.score}</span>
        </div>
      ))}
    </div>
  );
}

export default ScoreBoard;
