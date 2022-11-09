import React from "react";

import styles from "./Help.module.css";

const Help = React.memo((props) => {
  const onClickHandler = () => {
    props.onClick();
  };
  return (
    <div className={props.style} onClick={onClickHandler}>
      {props.content}
    </div>
  );
});

export default Help;
