import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Help from "./Help";
import manageQuestionData from "../../../Helpers/manageQuestionData";
import { setAnswersReducer } from "../../../Store/Question-slice";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

import styles from "./Helps.module.css";

const Helps = (props) => {
  const { helpIsUsed, setHelpIsUsed } = props;
  const { answers } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const peopleIcon = useMemo(() => {
    return <IoIosPeople />;
  }, []);
  const phoneIcon = useMemo(() => {
    return <FiPhoneCall />;
  }, []);

  const fiftyClickHanler = useCallback(() => {
    if (helpIsUsed.fifty) {
      return;
    } else {
      setHelpIsUsed((prev) => {
        return { ...prev, fifty: true };
      });
      const editedAnswers = manageQuestionData(answers);
      dispatch(setAnswersReducer(editedAnswers));
    }
  }, []);
  const audienceClickHanler = useCallback(() => {
    if (helpIsUsed.audience.isUsed) {
      return;
    } else {
      setHelpIsUsed((prev) => {
        return { ...prev, audience: { isUsed: true, isShown: true } };
      });
    }
  }, []);
  const phoneCallClickHanler = useCallback(() => {
    if (helpIsUsed.phoneCall.isUsed) {
      return;
    } else {
      setHelpIsUsed((prev) => {
        return { ...prev, phoneCall: { isUsed: true, isShown: true } };
      });
    }
  }, []);

  return (
    <div className={styles.box}>
      <Help
        content="50 : 50"
        style={helpIsUsed.fifty ? styles.used : styles.help}
        onClick={fiftyClickHanler}
      />
      <Help
        content={peopleIcon}
        style={helpIsUsed.audience.isUsed ? styles.used : styles.help}
        onClick={audienceClickHanler}
      />
      <Help
        content={phoneIcon}
        style={helpIsUsed.phoneCall.isUsed ? styles.used : styles.help}
        onClick={phoneCallClickHanler}
      />
    </div>
  );
};

export default Helps;
