import { useTimer } from "react-timer-hook";
import styles from "./Timer.module.css";

const Timer = (props) => {
  const { expiryTimestamp, onPause, onTimerExpire } = props;

  const { seconds, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => onTimerExpire,
  });

  return <div className={styles.timer}>{seconds}</div>;
};
export default Timer;
