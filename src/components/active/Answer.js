import React, { useCallback, useEffect, useMemo, useState } from "react";
import { calcWinEmount } from "../../Helpers/calcWinEmount";
import useSound from "use-sound";
import waitSound from "../../assets/sounds/wait.mp3";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import styles from "./Answer.module.css";

const Answer = React.memo((props) => {
  const [className, setClassName] = useState(styles.answer);

  const {
    id,
    isCorrect,
    correctAnswerIsShown,
    setCorrectAnswerIsShown,
    setModalIsActive,
    setPauseTimer,
    questionNumberHandler,
    setEarnedMoney,
  } = props;

  /*  const [wait] = useSound(waitSound);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound); */

  useEffect(() => {
    setCorrectAnswerIsShown(false);
    setClassName(styles.answer);
    setPauseTimer(false);
  }, [id]);

  const delay = useCallback((duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }, []);

  const onClickHandler = (isCorrect) => {
    //wait();
    setClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      if (isCorrect) {
        //correct();
        setClassName(styles.correct);
        delay(1500, () => {
          questionNumberHandler();
          setPauseTimer(false);
        });
      } else if (!isCorrect) {
        //wrong();
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
      {props.text}
    </div>
  );
});

export default Answer;
