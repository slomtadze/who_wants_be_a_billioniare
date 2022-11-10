import React from "react";

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
