export const calcAudienceHelpPercentage = (answers) => {
  const correctAnswerPer = Math.floor(50 + Math.random() * 11);
  const newArray = [];

  let temp = 0;

  for (let i = 0; i <= answers.length - 1; i++) {
    if (answers[i].correct === true) {
      newArray.push({ label: answers[i].id, percent: correctAnswerPer });
    } else if (answers[i].correct === false && i === 3) {
      const falsePer = 100 - correctAnswerPer - temp;
      newArray.push({ label: answers[i].id, percent: falsePer });
    } else if (answers[i].correct === false) {
      const falsePer =
        100 - correctAnswerPer - temp === 0
          ? 100 - correctAnswerPer - temp
          : Math.floor(Math.random() * (100 - correctAnswerPer - temp));
      newArray.push({ label: answers[i].id, percent: falsePer });
      temp += falsePer;
    } else if (answers[i].correct === undefined) {
      let tempLabel = "";
      if (i === 0) {
        tempLabel = "A";
      } else if (i === 1) {
        tempLabel = "B";
      } else if (i === 2) {
        tempLabel = "C";
      } else if (i === 3) {
        tempLabel = "D";
      }
      newArray.push({ label: tempLabel, percent: 0 });
    }
  }

  return newArray;
};
