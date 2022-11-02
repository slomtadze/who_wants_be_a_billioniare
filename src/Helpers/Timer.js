import { useEffect, useState } from "react";

export default function Timer(props) {
  const { setStop, questionNumber, pauseTimer } = props;
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) {
      setStop(true);
    } else if (pauseTimer) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
