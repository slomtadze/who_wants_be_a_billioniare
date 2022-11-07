import { useEffect, useState } from "react";
import data from "../../assets/Data/DUMMY_QUESTIONS";
import Answer from "./Answer";
import Timer from "../../Helpers/Timer";
import styles from "./Trivia.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswersReducer,
  setQuestionReducer,
} from "../../Store/Question-slice";
import ChartBar from "../Chart/Chart";

const Trivia = (props) => {
  const { questionText, answers } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);
  const {
    id,
    modalIsActive,
    stop,
    setStop,
    questionNumberHandler,
    setEarnedMoney,
    helpIsUsed,
    setModalIsActive,
  } = props;

  useEffect(() => {
    if (id > 0) {
      const currentQuestion = data.find((question) => question.id === id);
      dispatch(setQuestionReducer(currentQuestion.question));
      dispatch(setAnswersReducer(currentQuestion.answers));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedAnswer(null);
    setPauseTimer(false);
    setSelectedClassName(styles.answer);
    if (5 < id && id < 11) {
      setEarnedMoney(1000);
    }
  }, [id, setEarnedMoney]);

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
      const currentAnswer = answers.find((item) => item.text === answer.text);
      if (currentAnswer.correct) {
        setSelectedClassName(styles.correct);
        delay(1500, () => {
          questionNumberHandler();
          setSelectedAnswer(null);
          setPauseTimer(false);
        });
      } else if (!currentAnswer.correct) {
        setSelectedClassName(styles.wrong);
        setModalIsActive((prev) => {
          return { ...prev, stopGameModal: true };
        });
      }
    });
  };

  return (
    <div className={styles.trivia}>
      <div className={styles.timer}>
        {modalIsActive.startGameModal ? (
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
      {helpIsUsed.audience.isShown && <ChartBar answers={answers} />}
      <div className={styles.question}>{questionText}</div>
      <div className={styles.answers}>
        {answers.map((answer) => {
          if (selectedAnswer === answer.text) {
            return (
              <Answer
                key={answer.id}
                className={selectedClassName}
                text={answer.text}
              />
            );
          } else if (selectedAnswer !== answer.text && selectedAnswer) {
            return (
              <Answer
                key={answer.id}
                className={styles.blocked}
                text={answer.text}
              />
            );
          } else {
            return (
              <Answer
                key={answer.id}
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
