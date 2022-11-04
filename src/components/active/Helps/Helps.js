import styles from "./Helps.module.css";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from "react";

const Helps = (props) => {
  const { helpIsUsed, setHelpIsUsed } = props;

  const fiftyClickHanler = () => {
    setHelpIsUsed((prev) => {
      const existing = prev;
      return { ...existing, fifty: true };
    });
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
