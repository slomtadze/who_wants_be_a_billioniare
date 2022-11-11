import React, { useCallback, useEffect, useMemo, useState } from "react";
import { calcWinEmount } from "../../Helpers/calcWinEmount";
import useSound from "use-sound";
import waitSound from "../../assets/sounds/wait.mp3";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import styles from "./Answer.module.css";

const Answer = React.memo((props) => {
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);

  const {
    id,
    isCorrect,
    setModalIsActive,
    setPauseTimer,
    questionNumberHandler,
    setEarnedMoney,
  } = props;

  /*  const [wait] = useSound(waitSound);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound); */

  useEffect(() => {
    setSelectedClassName(styles.answer);
    setPauseTimer(false);
  }, [id]);

  const delay = useCallback((duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }, []);

  const onClickHandler = (isCorrect) => {
    //wait();
    setSelectedClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      if (isCorrect) {
        //correct();
        setSelectedClassName(styles.correct);
        delay(1500, () => {
          questionNumberHandler();
          setPauseTimer(false);
        });
      } else if (!isCorrect) {
        //wrong();
        setSelectedClassName(styles.wrong);
        calcWinEmount(id, setEarnedMoney);
        setModalIsActive((prev) => {
          return { ...prev, stopGameModal: true };
        });
      }
    });
  };

  return (
    <div
      className={selectedClassName}
      onClick={() => onClickHandler(isCorrect, props.text)}
    >
      {props.text}
    </div>
  );
});

export default Answer;
