import React, { useEffect, useState } from 'react'
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions)
      })
  }, [])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedItems = questions.filter(
      (question) => question.id !== deletedQuestion.id
    )
    setQuestions(updatedItems)
    console.log('question list', deletedQuestion)
  }

  function handleNewAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion
          } else {
            return question
          }
        })
        setQuestions(updatedQuestions)
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => {
          return (
            <QuestionItem
              key={question.id}
              question={question}
              onDeleteQuiz={handleDeleteQuestion}
              onNewAnswer={handleNewAnswer}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default QuestionList
