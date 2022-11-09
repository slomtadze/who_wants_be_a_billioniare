export const calcWinEmount = (id, setEarnedMoney) => {
  if (id > 5 && id < 11) {
    setEarnedMoney(1000);
  } else if (id >= 11 && id <= 14) {
    setEarnedMoney(32000);
  }
};
