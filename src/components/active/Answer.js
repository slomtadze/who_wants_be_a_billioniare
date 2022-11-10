import React from "react";
import styles from "./Answer.module.css";

const Answer = React.memo((props) => {
  console.log("Answer Render");
  const onClickHandler = (answer) => {
    props.onClick(answer);
  };

  return (
    <div className={props.className} onClick={onClickHandler}>
      {props.text}
    </div>
  );
});

export default Answer;
