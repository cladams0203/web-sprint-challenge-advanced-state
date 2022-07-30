import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, answerId, postAnswer } = props;

  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  }, []);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${answerId === quiz.answers[0].answer_id ? " selected" : ""}`}>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(quiz.answers[0].answer_id)}>{answerId === quiz.answers[0].answer_id ? "SELECTED" : "select"}</button>
              </div>

              <div className={`answer${answerId === quiz.answers[1].answer_id ? " selected" : ""}`}>
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(quiz.answers[1].answer_id)}>{answerId === quiz.answers[1].answer_id ? "SELECTED" : "select"}</button>
              </div>
            </div>

            <button disabled={answerId ? false : true} id="submitAnswerBtn" onClick={() => postAnswer({ quiz_id: quiz.quiz_id, answer_id: answerId })}>
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect(
  (s) => {
    return { quiz: s.quiz, answerId: s.selectedAnswer };
  },
  { fetchQuiz, selectAnswer, postAnswer }
)(Quiz);
