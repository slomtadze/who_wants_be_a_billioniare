import { useEffect, useState } from "react";

import data from "../../assets/Data/DUMMY_QUESTIONS";
import Timer from "../../Helpers/Timer";
import styles from "./Trivia.module.css";

const Trivia = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);
  const { id, modalIsActive, stop, setStop, questionNumberHandler } = props;
  const currentQuestion = data.find((question) => question.id === id);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const onAnwerSelect = (answer) => {
    setSelectedAnswer(answer.text);
    setSelectedClassName(styles.selected);
    setPauseTimer(true);

    delay(3000, () => {
      console.log(currentQuestion.answers);
      console.log(answer.text);
      const currentAnswer = currentQuestion.answers.find(
        (item) => item.text === answer.text
      );
      console.log(currentAnswer);
      if (currentAnswer.correct) {
        setSelectedClassName(styles.correct);
        delay(1500, () => {
          questionNumberHandler();
          setSelectedAnswer(null);
          setPauseTimer(false);
        });
      }
    });
  };

  return (
    <div className={styles.trivia}>
      <div className={styles.timer}>
        {modalIsActive ? (
          30
        ) : (
          <Timer
            stop={stop}
            setStop={setStop}
            questionNumber={id}
            pauseTimer={pauseTimer}
          />
        )}
      </div>
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
                  onClick={() => onAnwerSelect(answer)}
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
