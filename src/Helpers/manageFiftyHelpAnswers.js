const manageFiftyHelpAnswers = (answers) => {
  const correctAnswer = answers.find((answer) => answer.correct === true);
  const correctAnswerIndex = answers.findIndex(
    (answer) => answer.text === correctAnswer.text
  );

  const falseAnswerRndmIndexesArray = [];
  answers.forEach((answer, index) => {
    if (answer.correct === false) {
      falseAnswerRndmIndexesArray.push(index);
    }
  });
  const falseAnswerRndmIndex =
    falseAnswerRndmIndexesArray[Math.floor(Math.random() * 3)];

  const randomFalseAnswer = answers[falseAnswerRndmIndex];

  const newArray = answers.map((item, index) => {
    if (index === correctAnswerIndex) {
      return correctAnswer;
    } else if (index === falseAnswerRndmIndex) {
      return randomFalseAnswer;
    } else {
      return {};
    }
  });

  return newArray;
};

export default manageFiftyHelpAnswers;
