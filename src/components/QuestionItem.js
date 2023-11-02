import React from "react";

function QuestionItem({ question, handleDeleteQuestion, handleUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )) || [];

  const handleAnswerChange = (newIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...question,
        correctIndex: newIndex,
      }),
    })
      .then(response => response.json())
      .then(data => {
        handleUpdateQuestion(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={(e) => handleAnswerChange(e.target.value)}
        >
          {options}
        </select>
      </label>
      <button onClick={() => handleDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

