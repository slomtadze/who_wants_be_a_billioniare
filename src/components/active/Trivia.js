import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import waitSound from "../../assets/sounds/wait.mp3";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import data from "../../assets/Data/DUMMY_QUESTIONS";
import Answer from "./Answer";
import Timer from "../../Helpers/Timer";
import styles from "./Trivia.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswersReducer,
  setQuestionReducer,
} from "../../Store/Question-slice";
import { calcWinEmount } from "../../Helpers/calcWinEmount";
import ChartBar from "../Chart/Chart";
import PhoneCall from "../PhoneCall/PhoneCall";

const Trivia = (props) => {
  const { questionText, answers } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerIsShown, setCorrectAnswerIsShown] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(styles.answer);
  const {
    id,
    modalIsActive,
    questionNumberHandler,
    setEarnedMoney,
    helpIsUsed,
    setModalIsActive,
  } = props;

  const [wait] = useSound(waitSound);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound);

  useEffect(() => {
    if (id > 0) {
      const currentQuestion = data.find((question) => question.id === id);
      dispatch(setQuestionReducer(currentQuestion.question));
      dispatch(setAnswersReducer(currentQuestion.answers));
    }
    setSelectedAnswer(null);
    setSelectedClassName(styles.answer);
    setCorrectAnswerIsShown(false);
    setPauseTimer(false);
  }, [id, dispatch]);

  const delay = useCallback((duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }, []);

  const onAnwerSelect = useCallback(
    (answer) => {
      wait();
      setSelectedAnswer(answer.text);
      setSelectedClassName(styles.selected);
      setPauseTimer(true);

      delay(3000, () => {
        const currentAnswer = answers.find((item) => item.text === answer.text);
        if (currentAnswer.correct) {
          console.log(currentAnswer);
          correct();
          setSelectedClassName(styles.correct);
          delay(1500, () => {
            questionNumberHandler();
            setSelectedAnswer(null);
            setPauseTimer(false);
          });
        } else if (!currentAnswer.correct) {
          wrong();
          setSelectedClassName(styles.wrong);
          setCorrectAnswerIsShown(true);
          calcWinEmount(id, setEarnedMoney);
          setModalIsActive((prev) => {
            return { ...prev, stopGameModal: true };
          });
        }
      });
    },
    [answers]
  );

  const answerStyle = useCallback(
    (answer) => {
      if (selectedAnswer === answer.text) {
        return selectedClassName;
      } else if (
        selectedAnswer !== answer.text &&
        selectedAnswer &&
        !correctAnswerIsShown
      ) {
        return styles.blocked;
      } else if (
        selectedAnswer !== answer.text &&
        selectedAnswer &&
        correctAnswerIsShown &&
        answer.correct
      ) {
        return styles.correct;
      } else {
        return styles.answer;
      }
    },
    [selectedAnswer, correctAnswerIsShown, selectedClassName]
  );

  return (
    <div className={styles.trivia}>
      <div className={styles.timer}>
        {modalIsActive.startGameModal ? (
          30
        ) : (
          <Timer
            stopGameModal={modalIsActive.stopGameModal}
            setModalIsActive={setModalIsActive}
            questionNumber={id}
            pauseTimer={pauseTimer}
          />
        )}
      </div>
      {helpIsUsed.audience.isShown && <ChartBar answers={answers} />}
      {helpIsUsed.phoneCall.isShown && (
        <PhoneCall answer={answers.find((answer) => answer.correct === true)} />
      )}
      <div className={styles.question}>{questionText}</div>
      <div className={styles.answers}>
        {answers.map((answer) => {
          return (
            <Answer
              key={answer.id}
              className={answerStyle(answer)}
              text={answer.text}
              onClick={() => onAnwerSelect(answer)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Trivia;
