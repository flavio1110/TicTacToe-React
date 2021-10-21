import React from "react";
import styles from "./BoardItem.module.scss";

let BoardItem = ({ element, setSelected }) => {
  const handleClick = () => {
    if (setSelected) setSelected(element);
  };

  return (
    <div className={styles.boardItem} onClick={handleClick}>
      {element.currentSymbol}
    </div>
  );
};

export default BoardItem = React.memo(BoardItem);
