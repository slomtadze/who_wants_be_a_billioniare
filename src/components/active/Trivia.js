/* import "./trivia.css";
import data from "./Questions";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import correct from "../assets/src_sounds_correct.mp3";
import wrong from "../assets/src_sounds_wrong.mp3"; */
import { useState } from "react";
import data from "../../assets/Data/DUMMY_QUESTIONS";
import styles from "./Trivia.module.css";

const Trivia = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);

  const { id } = props;

  const currentQuestion = data.find((question) => question.id === id);

  const onAnwerConfirm = (answer) => {
    console.log(answer.text);
    setSelectedAnswer(answer.text);
    setSelectedClassName(styles.selected);
  };

  console.log("Rerenderd");

  return (
    <div className={styles.trivia}>
      <div className={styles.timer}>1</div>
      <div className={styles.question}>
        {currentQuestion ? currentQuestion.question : ""}
      </div>
      <div className={styles.answers}>
        {currentQuestion.answers.map((answer) => {
          if (selectedAnswer === answer.text) {
            return <div className={selectedClassName}>{answer.text}</div>;
          } else if (selectedAnswer !== answer.text && selectedAnswer) {
            return <div className={styles.blocked}>{answer.text}</div>;
          } else {
            return (
              <div
                className={styles.answer}
                onClick={() => onAnwerConfirm(answer)}
              >
                {answer.text}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Trivia;
