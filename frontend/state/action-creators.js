import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz };
}

export function inputChange(input) {
  return { type: INPUT_CHANGE, payload: input };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => console.log({ err }));
  };
}
export function postAnswer(answerObj) {
  console.log(answerObj);
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", answerObj)
      .then((res) => {
        console.log(res);
        dispatch(fetchQuiz());
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
      })
      .catch((err) => console.log({ err }));
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post("http://localhost:9000/api/quiz/new", { question_text: newQuiz.newQuestion.trim(), true_answer_text: newQuiz.newTrueAnswer.trim(), false_answer_text: newQuiz.newFalseAnswer.trim() })
      .then((res) => {
        console.log(res);
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch((err) => console.log({ err }));
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
