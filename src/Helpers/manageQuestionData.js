import data from "../assets/Data/DUMMY_QUESTIONS";

const manageQuestionData = (id, fiftyIsUsed, setQuestionText, setAnswers) => {
  console.log("manageQUestionFunction");

  const getRndmIndex = (usedIndex) => {
    const arr = [0, 1, 2, 3];
    arr.splice(usedIndex, 1);
    const tempIndex = Math.floor(Math.random() * 3);
    return arr[tempIndex];
  };

  const currentQuestion = data.find((question) => question.id === id);
  if (id > 0) {
    setQuestionText(currentQuestion.question);
    if (!fiftyIsUsed) {
      setAnswers(currentQuestion.answers);
    } else {
      console.log("Fifty Is Used Block");
      const correctAnswer = currentQuestion.answers.find(
        (answer) => answer.correct === true
      );
      const correctAnswerIndex = currentQuestion.answers.findIndex(
        (answer) => answer.text === correctAnswer.text
      );
      const falseAnswersArray = currentQuestion.answers.filter(
        (answer) => answer.correct !== true
      );
      const falseAnswer = falseAnswersArray[Math.floor(Math.random() * 3)];
      const falseAnswerRndmIndex = getRndmIndex(correctAnswerIndex);

      console.log(
        correctAnswer,
        correctAnswerIndex,
        falseAnswer,
        falseAnswerRndmIndex
      );

      setAnswers((prev) => {
        let existingArray = prev;
        let newArray = existingArray.map((item, index) => {
          if (index === correctAnswerIndex) {
            console.log(index, correctAnswerIndex);
            return correctAnswer;
          } else if (index === falseAnswerRndmIndex) {
            console.log(index, falseAnswerRndmIndex);
            return falseAnswer;
          } else {
            return {};
          }
        });

        return newArray;
      });
    }
  }
};

export default manageQuestionData;
