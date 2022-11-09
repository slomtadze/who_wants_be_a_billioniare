import ChartWrapper from "../UI/ChartWrapper";
import { TbPhoneCall } from "react-icons/tb";
import styles from "./PhoneCall.module.css";
import { useEffect, useState } from "react";

const PhoneCall = (props) => {
  const { text } = props.answer;
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setCorrectAnswer(`Friend say's correct answer is: ${text}`);
    }, 3000);
  }, []);

  return (
    <ChartWrapper>
      <div className={styles.header}>
        <TbPhoneCall className={styles.icon} />
        <h1>Calling...</h1>
      </div>
      <div>
        <p className={styles.answer}>
          {correctAnswer}
          {/* Friend say's correct answer is: <br /> <span>{correctAnswer}</span> */}
        </p>
      </div>
    </ChartWrapper>
  );
};

export default PhoneCall;
