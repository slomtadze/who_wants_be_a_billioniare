import styles from "./Helps.module.css";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import manageQuestionData from "../../../Helpers/manageQuestionData";
import { setAnswersReducer } from "../../../Store/Question-slice";

const Helps = (props) => {
  const { helpIsUsed, setHelpIsUsed } = props;
  const { answers } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const fiftyClickHanler = () => {
    if (helpIsUsed.fifty) {
      return;
    } else {
      setHelpIsUsed((prev) => {
        const existing = prev;
        return { ...existing, fifty: true };
      });
      const editedAnswers = manageQuestionData(answers);
      dispatch(setAnswersReducer(editedAnswers));
    }
  };
  const audienceClickHanler = () => {
    setHelpIsUsed((prev) => {
      const existing = prev;
      return { ...existing, audience: true };
    });
  };
  const phoneCallClickHanler = () => {
    setHelpIsUsed((prev) => {
      const existing = prev;
      return { ...existing, phoneCall: true };
    });
  };

  return (
    <div className={styles.box}>
      <div
        className={helpIsUsed.fifty ? styles.used : styles.help}
        onClick={fiftyClickHanler}
      >
        50 : 50
      </div>
      <div
        className={helpIsUsed.audience ? styles.used : styles.help}
        onClick={audienceClickHanler}
      >
        <IoIosPeople />
      </div>
      <div
        className={helpIsUsed.phoneCall ? styles.used : styles.help}
        onClick={phoneCallClickHanler}
      >
        <FiPhoneCall />
      </div>
    </div>
  );
};

export default Helps;
