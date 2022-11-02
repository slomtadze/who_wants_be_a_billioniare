import React, { Fragment, useEffect, useState } from "react";
import styles from "./App.module.css";
import Trivia from "./components/active/Trivia";
import Timer from "./Helpers/Timer";
import List from "./components/List/List";
import Modal from "./components/UI/Modal";

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);

  const [earnedMoney, setEarnedMoney] = useState("$ 0");
  /* const [letsPlay] = useSound(play); */
  const [modalIsActive, setModalIsActive] = useState(true);

  const overlayHandler = () => {
    setModalIsActive(false);
  };
  const questionNumberHandler = () => {
    setQuestionNumber((prev) => prev + 1);
  };

  return (
    <Fragment>
      {modalIsActive && (
        <Modal
          onClose={overlayHandler}
          text="Are you ready?"
          button="Let's do it"
        />
      )}
      {stop && (
        <Modal
          onClose={overlayHandler}
          text={`You have won ${earnedMoney} `}
          button="Take another try"
          buttonEnd="End Game"
        />
      )}
      <div className={styles.box}>
        <div className={styles["left-side"]}>
          <Trivia
            id={!modalIsActive && questionNumber}
            earnedMoney={earnedMoney}
            modalIsActive={modalIsActive}
            stop={stop}
            setStop={setStop}
            questionNumberHandler={questionNumberHandler}
          />
        </div>
        <div className={styles["right-side"]}>
          <List number={questionNumber} />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
