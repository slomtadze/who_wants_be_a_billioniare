import React, { useCallback, useEffect, useMemo, useState } from "react";
import { calcWinEmount } from "../../Helpers/calcWinEmount";
import { motion } from "framer-motion";
//import useSound from "use-sound";
//import sounds from "../../assets/sounds/sounds.mp3";

import styles from "./Answer.module.css";

const Answer = React.memo((props) => {
  const [className, setClassName] = useState(styles.answer);
  //const [animation, setAnimation] = useState(undefined);

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

  /*   const [play, { stop }] = useSound(sounds, {
    sprite: {
      wait: [0, 3000],
      correct: [17000, 3000],
      wrong: [24000, 3000],
    },
  }); */

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
    // play({ id: "wait" });
    setSelectedAnswer(text);
    setClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      if (isCorrect) {
        //   play({ id: "correct" });
        setClassName(styles.correct);

        delay(1500, () => {
          setSelectedAnswer(null);
          questionNumberHandler();
          setPauseTimer(false);
        });
      } else if (!isCorrect) {
        //  play({ id: "wrong" });
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
    <motion.div
      className={correctAnswerIsShown && isCorrect ? styles.correct : className}
      /* initial={
        className === styles.selected
          ? { background: "#ed811c" }
          : { background: "#060116" }
      }
      whileHover={{ background: "#303099" }}
      animate={animation} */
      //exit={{ background: "#060116" }}
      onClick={() => onClickHandler(isCorrect, props.text)}
    >
      {props.text}
    </motion.div>
  );
});

export default Answer;
