import { useEffect, useState } from "react";

export default function Timer(props) {
  const { setModalIsActive, questionNumber, pauseTimer } = props;
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      setModalIsActive((prev) => {
        return { ...prev, stopGameModal: true };
      });
      return;
    } else if (pauseTimer) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setModalIsActive, pauseTimer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
