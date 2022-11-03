import React, { Fragment, useEffect, useState } from "react";
import styles from "./App.module.css";
import Trivia from "./components/active/Trivia";
import List from "./components/List/List";
import Modal from "./components/UI/Modal";

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);

  const [earnedMoney, setEarnedMoney] = useState(0);
  /* const [letsPlay] = useSound(play); */
  const [modalIsActive, setModalIsActive] = useState(true);
  const [endGameModal, setEndGameModal] = useState(false);

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
  } else if (endGameModal) {
    modal = <Modal title="Thanks for play" />;
  }

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
