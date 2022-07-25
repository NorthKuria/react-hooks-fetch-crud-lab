import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

function App() {
  const [page, setPage] = useState('List')
  const [questionsList, setQuestionsList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((questions) => setQuestionsList(questions))
  }, [])

  const onAddQuestion = (newQuestion) => {
    setQuestionsList([...questionsList, newQuestion])
  }

  const onDeleteQuestion = (item) => {
    const updatedQuestions = questionsList.filter(
      (question) => question.id !== item.id
    )
    setQuestionsList(updatedQuestions)
  }

  const onUpdate = (item) => {
    const updateAnswer = questionsList.map((question) => {
      if (question.id === item.id) return item
      return question
    })
    setQuestionsList(updateAnswer)
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm onAdd={onAddQuestion} />
      ) : (
        <QuestionList
          questions={questionsList}
          onDelete={onDeleteQuestion}
          onUpdate={onUpdate}
        />
      )}
    </main>
  )
}

export default App
