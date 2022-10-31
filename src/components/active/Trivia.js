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
  const [className, setClassName] = useState(styles.answer);

  const { id } = props;

  const currentQuestion = data.find((question) => question.id === id);

  const onAnwerConfirm = (answer) => {
    setSelectedAnswer(answer);
    setClassName(styles.correct);
  };

  /*     setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    }); */

  /*   const { setStop, questionNumber, setQuestionNumber } = props;

  const [question, setQuestion] = useState(null);
  ;
  

  const [corectAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };



    delay(5000, () => {
      if (a.correct) {
        corectAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          selectedAnswer(null);
        });
      } else {
        wrongAnswer();
        //ჩასამატებელია სწორი პასუხი რომ გამომიჩნდეს ეკრანზე
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  }; */

  return (
    <div className={styles.trivia}>
      <div className={styles.timer}>1</div>
      <div className={styles.question}>
        {currentQuestion ? currentQuestion.question : ""}
      </div>
      <div className={styles.answers}>
        {currentQuestion.answers.map((answer) => {
          if (selectedAnswer == answer.text) {
            return (
              <div
                className={styles.answer}
                onClick={() => onAnwerConfirm(answer)}
              >
                {answer.text}
              </div>
            );
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
