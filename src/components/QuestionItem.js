import React from 'react'

function QuestionItem({ question, onDeleteQuiz, onNewAnswer }) {
  const { id, prompt, answers, correctIndex } = question

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ))

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => onDeleteQuiz(question))
    console.log(question)
  }

  function handleNewAnswer(event) {
    onNewAnswer(id, parseInt(event.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleNewAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  )
}
export default QuestionItem
