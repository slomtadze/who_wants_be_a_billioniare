import { useState } from "react";
import data from "../../assets/Data/DUMMY_QUESTIONS";

const useData = (id, fiftyIsUsed) => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([{}, {}, {}, {}]);

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

      setAnswers((prev) => {
        let existingArray = prev;
        existingArray.splice(correctAnswerIndex, 1, correctAnswer);
        existingArray.splice(falseAnswerRndmIndex, 1, falseAnswer);
        return existingArray;
      });
    }
  }

  return {
    questionText,
    answers,
  };
};

export default useData;
