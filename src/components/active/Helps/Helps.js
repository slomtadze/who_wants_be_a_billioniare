import styles from "./Helps.module.css";
import { useDispatch, useSelector } from "react-redux";
import manageQuestionData from "../../../Helpers/manageQuestionData";
import { setAnswersReducer } from "../../../Store/Question-slice";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

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
    if (helpIsUsed.audience.isUsed) {
      return;
    } else {
      setHelpIsUsed((prev) => {
        const existing = prev;
        return { ...existing, audience: { isUsed: true, isShown: true } };
      });
    }
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
        className={helpIsUsed.audience.isUsed ? styles.used : styles.help}
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
