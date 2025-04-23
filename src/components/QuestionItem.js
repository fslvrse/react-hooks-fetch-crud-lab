// QuestionItem.js
import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleSelectChange(e) {
    onUpdateQuestion(id, e.target.value);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleSelectChange}>
          {options}
        </select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
