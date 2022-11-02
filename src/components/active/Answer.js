import styles from "./Answer.module.css";

const Answer = (props) => {
  const onClickHandler = (answer) => {
    props.onClick(answer);
  };

  return (
    <div className={props.className} onClick={onClickHandler}>
      {props.text}
    </div>
  );
};

export default Answer;
