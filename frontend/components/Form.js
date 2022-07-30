import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { form, inputChange, postQuiz } = props;
  console.log(props.form);
  const onChange = (evt) => {
    inputChange({ [evt.target.id]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz(form);
  };

  const checkDisabled = () => {
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form;
    if (newQuestion.trim() && newTrueAnswer.trim() && newFalseAnswer.trim()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={checkDisabled()}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((s) => {
  return { form: s.form };
}, actionCreators)(Form);
