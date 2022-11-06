import React, { Fragment, useState } from "react";
import styles from "./App.module.css";
import Trivia from "./components/active/Trivia";
import Helps from "./components/active/Helps/Helps";
import List from "./components/List/List";
import Modal from "./components/UI/Modal";

const App = () => {
  const [helpIsUsed, setHelpIsUsed] = useState({
    fifty: false,
    audience: { isUsed: false, isShown: false },
    phoneCall: false,
  });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);

  const [earnedMoney, setEarnedMoney] = useState(0);
  /* const [letsPlay] = useSound(play); */
  const [modalIsActive, setModalIsActive] = useState(false);

  const gameStartHandler = () => {
    setModalIsActive(false);
  };
  const gameRestartHandler = () => {
    setStop(false);
    setModalIsActive(true);
    setQuestionNumber(1);
  };
  const endGameEndHandler = () => {
    setStop(false);
  };
  const questionNumberHandler = () => {
    setQuestionNumber((prev) => prev + 1);
    if (helpIsUsed.audience.isShown) {
      setHelpIsUsed((prev) => {
        const existing = prev;
        return { ...existing, audience: { isUsed: true, isShown: false } };
      });
    }
  };

  // Gasasworebelia end game
  let modal;
  if (modalIsActive) {
    modal = (
      <Modal
        onGameStart={gameStartHandler}
        title="Are you ready?"
        buttonText="Let's do it"
      />
    );
  } else if (stop) {
    modal = (
      <Modal
        title={`You have won $ ${earnedMoney} `}
        buttonText="Take another try"
        onGameStart={gameRestartHandler}
        buttonEndText="End Game"
        onButtonEnd={endGameEndHandler}
      />
    );
  } /* else if (endGameModal) {
    modal = <Modal title="Thanks for play" />;
  } */

  return (
    <Fragment>
      {modal}
      <div className={styles.box}>
        <div className={styles["left-side"]}>
          <Trivia
            id={!modalIsActive && questionNumber}
            earnedMoney={earnedMoney}
            setEarnedMoney={setEarnedMoney}
            modalIsActive={modalIsActive}
            stop={stop}
            setStop={setStop}
            questionNumberHandler={questionNumberHandler}
            helpIsUsed={helpIsUsed}
          />
        </div>
        <div className={styles["right-side"]}>
          <Helps helpIsUsed={helpIsUsed} setHelpIsUsed={setHelpIsUsed} />
          <List number={questionNumber} />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
