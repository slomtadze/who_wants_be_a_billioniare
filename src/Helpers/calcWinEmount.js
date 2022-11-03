export const calcWinEmount = (id, setEarnedMoney, finalAnswer) => {
  if (id > 5 && id < 11) {
    setEarnedMoney(1000);
  } else if (id >= 11 && id <= 14) {
    setEarnedMoney(32000);
  } else if (id === 15 && finalAnswer) {
    setEarnedMoney(1000000);
  } else if (id === 15 && !finalAnswer) {
    setEarnedMoney(32000);
  }
};
