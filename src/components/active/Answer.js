import React, { useCallback, useEffect, useState } from "react";
import { calcWinEmount } from "../../Helpers/calcWinEmount";

import styles from "./Answer.module.css";

const Answer = React.memo((props) => {
  const [className, setClassName] = useState(styles.answer);

  const {
    id,
    isCorrect,
    selectedAnswer,
    setSelectedAnswer,
    correctAnswerIsShown,
    setCorrectAnswerIsShown,
    setModalIsActive,
    setPauseTimer,
    questionNumberHandler,
    setEarnedMoney,
  } = props;

  useEffect(() => {
    setCorrectAnswerIsShown(false);

    if (selectedAnswer && selectedAnswer !== props.text) {
      setClassName(styles.blocked);
    } else if (selectedAnswer && selectedAnswer === props.text) {
      setClassName(styles.selected);
    } else {
      setClassName(styles.answer);
    }
  }, [id, setCorrectAnswerIsShown, selectedAnswer, props.text]);

  const delay = useCallback((duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }, []);

  const onClickHandler = (isCorrect, text) => {
    setSelectedAnswer(text);
    setClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      if (isCorrect) {
        setClassName(styles.correct);
        delay(1500, () => {
          setSelectedAnswer(null);
          questionNumberHandler();
          setPauseTimer(false);
        });
      } else if (!isCorrect) {
        setClassName(styles.wrong);
        setCorrectAnswerIsShown(true);
        calcWinEmount(id, setEarnedMoney);
        setModalIsActive((prev) => {
          return { ...prev, stopGameModal: true };
        });
      }
    });
  };

  return (
    <div
      className={correctAnswerIsShown && isCorrect ? styles.correct : className}
      onClick={() => onClickHandler(isCorrect, props.text)}
    >
      {props.text ? (
        <div className={styles.answerId}>{`${props.answerId}:`}</div>
      ) : (
        ""
      )}
      {props.text ? <div>{props.text}</div> : ""}
    </div>
  );
});

export default Answer;
