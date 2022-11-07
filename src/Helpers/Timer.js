import { useEffect, useState } from "react";

export default function Timer(props) {
  const { setStop, questionNumber, pauseTimer, stop } = props;
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) {
      setStop(true);
      return;
    } else if (pauseTimer) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, stop, setStop, pauseTimer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
