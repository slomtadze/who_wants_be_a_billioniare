import { useEffect, useState } from "react";
import Answer from "./Answer";

import data from "../../assets/Data/DUMMY_QUESTIONS";
import Timer from "../../Helpers/Timer";
import styles from "./Trivia.module.css";

const Trivia = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
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
      const currentAnswer = currentQuestion.answers.find(
        (item) => item.text === answer.text
      );
      const correctAnswer = currentQuestion.answers.find(
        (item) => item.correct === true
      );
      if (currentAnswer.correct) {
        setSelectedClassName(styles.correct);
        delay(1500, () => {
          questionNumberHandler();
          setSelectedAnswer(null);
          setPauseTimer(false);
        });
      } else if (!currentAnswer.correct) {
        setSelectedClassName(styles.wrong);
        setCorrectAnswer(correctAnswer);
        setStop(true);
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
              return (
                <Answer className={selectedClassName} text={answer.text} />
              );
            } else if (selectedAnswer !== answer.text && selectedAnswer) {
              return <Answer className={styles.blocked} text={answer.text} />;
            } else if (
              correctAnswer &&
              correctAnswer.correct === answer.correct &&
              selectedAnswer
            ) {
              return <Answer className={styles.correct} text={answer.text} />;
            } else {
              return (
                <Answer
                  className={styles.answer}
                  text={answer.text}
                  onClick={() => onAnwerSelect(answer)}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Trivia;
