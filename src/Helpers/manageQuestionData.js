const manageQuestionData = (answers) => {
  const getRndmIndex = (usedIndex) => {
    const arr = [0, 1, 2, 3];
    arr.splice(usedIndex, 1);
    const tempIndex = Math.floor(Math.random() * 3);
    return arr[tempIndex];
  };

  const correctAnswer = answers.find((answer) => answer.correct === true);
  const correctAnswerIndex = answers.findIndex(
    (answer) => answer.text === correctAnswer.text
  );
  const falseAnswersArray = answers.filter((answer) => answer.correct !== true);
  const falseAnswer = falseAnswersArray[Math.floor(Math.random() * 3)];
  const falseAnswerRndmIndex = getRndmIndex(correctAnswerIndex);

  const newArray = answers.map((item, index) => {
    if (index === correctAnswerIndex) {
      return correctAnswer;
    } else if (index === falseAnswerRndmIndex) {
      return falseAnswer;
    } else {
      return {};
    }
  });

  return newArray;
};

export default manageQuestionData;
