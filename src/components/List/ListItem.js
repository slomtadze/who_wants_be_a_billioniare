import React from "react";
import styles from "./ListItem.module.css";

const ListItem = React.memo((props) => {
  const { id, amount, style } = props;

  return (
    <li
      className={
        //questionNumber === id ? styles["list-active"] : styles["list-item"]
        style
      }
    >
      <span className={styles["item-number"]}>{id}</span>
      <span className={styles["item-amount"]}>{amount}</span>
    </li>
  );
});

export default ListItem;
