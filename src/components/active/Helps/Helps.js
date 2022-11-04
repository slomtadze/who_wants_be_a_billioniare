import styles from "./Helps.module.css";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from "react";

const Helps = (props) => {
  const [fifty, setFifty] = useState("50 : 50");
  const [audience, setAudience] = useState(<IoIosPeople />);
  const [phoneCall, setPhoneCall] = useState(<FiPhoneCall />);
  return (
    <div className={styles.box}>
      <div className={styles.help}>{fifty}</div>
      <div className={styles.help}>{audience}</div>
      <div className={styles.help}>{phoneCall}</div>
    </div>
  );
};

export default Helps;
