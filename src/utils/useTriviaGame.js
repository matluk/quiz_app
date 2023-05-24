import { useState } from "react";
import axios from "axios";

export default function useTriviaGame() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = (amount, category, difficulty) => {
    setQuestions(null);
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setIsGameOver(false);
    fetchTriviaQuestions(amount, category, difficulty).then(setQuestions);
  };

  const incrementCorrectAnswersCounter = (isCorrect) => {
    setCorrectAnswersCount((prev) => prev + 1);
  };

  const showNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  async function fetchTriviaQuestions(amount, category, difficulty) {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?${amount && `amount=${amount}`}${
          category && `&category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
      );
      return response.data.results;
    } catch (err) {
      alert(err);
    }
  }

  return {
    currentQuestion:
      Array.isArray(questions) && !isGameOver
        ? questions[currentQuestionIndex]
        : null,
    currentQuestionIndex,
    correctAnswersCount,
    questions,
    isGameOver,
    fetchTriviaQuestions,
    incrementCorrectAnswersCounter,
    showNextQuestion,
    resetGame,
  };
}
