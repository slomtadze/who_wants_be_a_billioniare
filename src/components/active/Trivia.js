import { useEffect, useState } from "react";

import data from "../../assets/Data/DUMMY_QUESTIONS";
import Timer from "./Timer";
import styles from "./Trivia.module.css";

const Trivia = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);
  const [pauseTimer, setPauseTimer] = useState(false);
  const { id, onExpire } = props;
  const currentQuestion = data.find((question) => question.id === id);

  const correctAnwerHandler = () => {
    onExpire();
  };

  const inCorrectAnswerHandler = () => {};

  const onAnwerConfirm = (answer) => {
    setSelectedAnswer(answer.text);
    setSelectedClassName(styles.selected);
    const timer = setTimeout(() => {
      if (answer.correct) {
        correctAnwerHandler();
        setSelectedAnswer(null);
      } else {
        inCorrectAnswerHandler();
      }
    }, 3000);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);

  const answerHandler = (answer) => {};

  return (
    <div className={styles.trivia}>
      {currentQuestion && (
        <Timer expiryTimestamp={time} onTimerExpire={props.onExpire} />
      )}
      <div className={styles.question}>
        {currentQuestion ? currentQuestion.question : ""}
      </div>
      <div className={styles.answers}>
        {currentQuestion &&
          currentQuestion.answers.map((answer) => {
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
