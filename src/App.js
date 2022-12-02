import React, { Fragment, useCallback, useState } from "react";
import styles from "./App.module.css";
import Trivia from "./components/active/Trivia";
import Helps from "./components/active/Helps/Helps";
import List from "./components/List/List";
import Modal from "./components/UI/Modal";

const App = () => {
  const [modalIsActive, setModalIsActive] = useState({
    startGameModal: true,
    stopGameModal: false,
    endGameModal: false,
  });
  const [helpIsUsed, setHelpIsUsed] = useState({
    fifty: false,
    audience: { isUsed: false, isShown: false },
    phoneCall: { isUsed: false, isShown: false },
  });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earnedMoney, setEarnedMoney] = useState(0);

  const gameStartHandler = () => {
    setModalIsActive((prev) => {
      return { ...prev, startGameModal: false };
    });
    setQuestionNumber(1);
    setHelpIsUsed({
      fifty: false,
      audience: { isUsed: false, isShown: false },
      phoneCall: { isUsed: false, isShown: false },
    });
  };
  const gameRestartHandler = () => {
    setModalIsActive((prev) => {
      return { ...prev, startGameModal: true, stopGameModal: false };
    });
  };
  const endGameEndHandler = () => {
    setModalIsActive({
      startGameModal: false,
      stopGameModal: false,
      endGameModal: true,
    });
  };
  const questionNumberHandler = useCallback(() => {
    setQuestionNumber((prev) => prev + 1);
    if (helpIsUsed.audience.isShown) {
      setHelpIsUsed((prev) => {
        return { ...prev, audience: { isUsed: true, isShown: false } };
      });
    } else if (helpIsUsed.phoneCall.isShown) {
      setHelpIsUsed((prev) => {
        return { ...prev, phoneCall: { isUsed: true, isShown: false } };
      });
    }
  }, [helpIsUsed.audience.isShown, helpIsUsed.phoneCall.isShown]);

  let modal;
  if (modalIsActive.startGameModal) {
    modal = (
      <Modal
        onGameStart={gameStartHandler}
        title="Are you ready?"
        buttonText="Let's do it"
      />
    );
  } else if (modalIsActive.stopGameModal) {
    modal = (
      <Modal
        title={`You have won $ ${earnedMoney} `}
        buttonText="Take another try"
        onGameStart={gameRestartHandler}
        buttonEndText="End Game"
        onButtonEnd={endGameEndHandler}
      />
    );
  } else if (modalIsActive.endGameModal) {
    modal = <Modal title="Thanks for play" />;
  }

  return (
    <Fragment>
      {modal}
      <div className={styles.box}>
        <div className={styles["left-side"]}>
          <Trivia
            id={!modalIsActive.startGameModal && questionNumber}
            earnedMoney={earnedMoney}
            setEarnedMoney={setEarnedMoney}
            modalIsActive={modalIsActive}
            setModalIsActive={setModalIsActive}
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
