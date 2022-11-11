import React, { useCallback, useEffect, useMemo, useState } from "react";
import { calcWinEmount } from "../../Helpers/calcWinEmount";
import { motion } from "framer-motion";
import useSound from "use-sound";
import waitSound from "../../assets/sounds/wait.mp3";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
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
  /*   const correctAnswerAnimation = useMemo(() => {
    return {
      background: [
        "#1eba20",
        "#060116",
        "#1eba20",
        "#060116",
        "#1eba20",
        "#060116",
        "#1eba20",
      ],
    };
  }, []); */

  /*  const [wait] = useSound(waitSound);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound); */

  /* useEffect(() => {
    if (selectedAnswer && selectedAnswer !== props.text) {
      setClassName(styles.blocked);
    }
  }, [selectedAnswer, props.text]); */

  useEffect(() => {
    setCorrectAnswerIsShown(false);
    //  setAnimation(undefined);
    if (selectedAnswer && selectedAnswer !== props.text) {
      setClassName(styles.blocked);
    } else if (selectedAnswer && selectedAnswer === props.text) {
      setClassName(styles.selected);
    } else {
      setClassName(styles.answer);
    }

    setPauseTimer(false);
  }, [id, setCorrectAnswerIsShown, setPauseTimer, selectedAnswer, props.text]);

  const delay = useCallback((duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }, []);

  const onClickHandler = (isCorrect, text) => {
    //wait();
    setSelectedAnswer(text);
    setClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      if (isCorrect) {
        //correct();
        setClassName(styles.correct);
        // setAnimation(correctAnswerAnimation);
        delay(1500, () => {
          setSelectedAnswer(null);
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
