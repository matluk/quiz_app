import * as sanitizeHtml from "sanitize-html";
import shuffle from "lodash/shuffle";
import { useState, useMemo } from "react";
import { Button } from "@mui/material";
import styles from './Question.module.css'

export default function Question({
  question,
  category,
  difficulty,
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswers,
  type,
  showNextQuestion,
  incrementCorrectAnswersCounter,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answers = useMemo(
    () => shuffle([correctAnswer, ...incorrectAnswers]),
    [correctAnswer, incorrectAnswers]
  );

  const answerQuestion = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      incrementCorrectAnswersCounter();
    }
  };

  const isCorrect = (answer) => answer === correctAnswer;

  return (
    <div className={styles["question-card"]}>
      <div className={styles["question-card__question"]}>{sanitizeHtml(question)}</div>
      <div className={styles["question-card__category"]}>{category}</div>
      <div className={styles["question-card__difficulty"]}>{difficulty}</div>
      <div className={styles["question-card__answers"]}>
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`${styles["question-card__answer"]} ${
              selectedAnswer === answer
                ? isCorrect(answer)
                  ? styles["question-card__answer--correct"]
                  : styles["question-card__answer--incorrect"]
                : ""
            }`}
            disabled={true}
            onClick={() => !selectedAnswer && answerQuestion(answer)}
          >
            {sanitizeHtml(answer)}
          </div>
        ))}
      </div>
      <div className={styles["question-card__controls"]}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={!selectedAnswer}
          onClick={showNextQuestion}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
