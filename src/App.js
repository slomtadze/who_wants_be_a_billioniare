import React, { Fragment, useState } from "react";
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

  return (
    <Fragment>
      {modalIsActive && <Modal onClose={overlayHandler} />}
      <div className={styles.box}>
        <div className={styles["left-side"]}>
          <Trivia id={questionNumber} />
        </div>
        <div className={styles["right-side"]}>
          <List number={questionNumber} />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
