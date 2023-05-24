import useTriviaGame from "../utils/useTriviaGame";
import Question from "./Question";
import { useEffect } from "react";
import { Button } from "@mui/material";
import styles from "./TriviaGame.module.css"

export default function TriviaGame({
  start,
  setStart,
  amount,
  category,
  difficulty,
}) {
  const {
    currentQuestion,
    currentQuestionIndex,
    correctAnswersCount,
    questions,
    isGameOver,
    resetGame,
    showNextQuestion,
    incrementCorrectAnswersCounter,
  } = useTriviaGame();

  useEffect(() => {
    resetGame(amount, category, difficulty);
  }, [amount, category, difficulty]);

  return questions ? (
    <div>
      <h2>
        Question: {currentQuestionIndex + 1} / {questions?.length}
      </h2>
      <h2>
        Correct answers: {correctAnswersCount} / {questions?.length}
      </h2>
      {currentQuestion && (
        <Question
          {...currentQuestion}
          key={currentQuestion.question}
          showNextQuestion={showNextQuestion}
          incrementCorrectAnswersCounter={incrementCorrectAnswersCounter}
        />
      )}
      {isGameOver && (
        <div className={styles["game-over"]}>
          Game over:{" "}
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => {
              resetGame(amount, "", "");
              setStart(false);
            }}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
