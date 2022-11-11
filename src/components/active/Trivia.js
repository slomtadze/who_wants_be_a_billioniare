import { useCallback, useEffect, useState } from "react";
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
import PhoneCall from "../PhoneCall/PhoneCall";

const Trivia = (props) => {
  const { questionText, answers } = useSelector((state) => state.question);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerIsShown, setCorrectAnswerIsShown] = useState(false);
  const dispatch = useDispatch();
  const {
    id,
    modalIsActive,
    questionNumberHandler,
    setEarnedMoney,
    helpIsUsed,
    setModalIsActive,
  } = props;

  useEffect(() => {
    setSelectedAnswer(null);
  }, [modalIsActive.startGameModal]);

  useEffect(() => {
    if (id > 0) {
      const currentQuestion = data.find((question) => question.id === id);
      dispatch(setQuestionReducer(currentQuestion.question));
      dispatch(setAnswersReducer(currentQuestion.answers));
    }
    setPauseTimer(false);
  }, [id, dispatch]);

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
              isCorrect={answer.correct}
              text={answer.text}
              id={id}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              correctAnswerIsShown={correctAnswerIsShown}
              setCorrectAnswerIsShown={setCorrectAnswerIsShown}
              setModalIsActive={setModalIsActive}
              setEarnedMoney={setEarnedMoney}
              setPauseTimer={setPauseTimer}
              questionNumberHandler={questionNumberHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Trivia;
