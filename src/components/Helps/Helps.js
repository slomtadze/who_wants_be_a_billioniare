import styles from "./Helps.module.css";
import { IoIosPeople } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

const Helps = (props) => {
  return (
    <div className={styles.box}>
      <div className={styles.fifty}>50 : 50</div>
      <div className={styles.audience}>
        <IoIosPeople />
      </div>
      <div className={styles.call}>
        <FiPhoneCall />
      </div>
    </div>
  );
};

export default Helps;
