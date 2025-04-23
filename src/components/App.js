// App.js
import React, { useState, useEffect } from "react"; // Add useEffect
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]); // Add questions state

  useEffect(() => {
    // Fetch questions when component mounts
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    const answers = [
      newQuestion.answer1,
      newQuestion.answer2,
      newQuestion.answer3,
      newQuestion.answer4,
    ];

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: answers,
        correctIndex: parseInt(newQuestion.correctIndex),
      }),
    })
      .then((r) => r.json())
      .then((data) => setQuestions([...questions, data]));
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(newCorrectIndex),
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
