import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:4000/questions')
      .then(r=>r.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(error));
  }, [])
  function updateQuestionList(newQuestion) {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestionList={updateQuestionList} /> : <QuestionList questions={questions} setQuestions={setQuestions}/>}
    </main>
  );
}

export default App;
